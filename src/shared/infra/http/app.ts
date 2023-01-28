import * as dotenv from "dotenv";
import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";
import swaggerUi from "swagger-ui-express";
import "@shared/infra/typeorm/data-source";
import "@shared/container";

import { AppError } from "@shared/errors/AppError";

import swaggerFile from "../../../swagger.json";
import routers from "./routes";

dotenv.config();

const app = express();

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(routers);

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
