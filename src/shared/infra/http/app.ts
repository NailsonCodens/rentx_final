import "dotenv/config";
import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";
import swaggerUi from "swagger-ui-express";
import "@shared/infra/typeorm/data-source";
import "@shared/container";
import cors from "cors";

import upload from "@config/upload";
import * as Sentry from "@sentry/node";
import * as Tracing from "@sentry/tracing";
import { AppError } from "@shared/errors/AppError";

import swaggerFile from "../../../swagger.json";
import rateLimiter from "./middlewares/rateLimiter";
import routers from "./routes";

const app = express();

app.use(rateLimiter);

Sentry.init({
  dsn: process.env.SENTRY_DNS,
  integrations: [
    // enable HTTP calls tracing
    new Sentry.Integrations.Http({ tracing: true }),
    // enable Express.js middleware tracing
    new Tracing.Integrations.Express({ app }),
  ],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

app.use(express.json());

// TracingHandler creates a trace for every incoming request

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use("/avatar/", express.static(`${upload.tmpFolder}/avatar`));
app.use("/cars/", express.static(`${upload.tmpFolder}/cars`));

app.use(cors());
app.use(routers);

app.use(Sentry.Handlers.errorHandler());

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        message: err.message,
      });
    }

    return response.status(500).json({
      status: "error",
      message: `Internal server error = ${err.message}`,
    });
  }
);

export { app };
