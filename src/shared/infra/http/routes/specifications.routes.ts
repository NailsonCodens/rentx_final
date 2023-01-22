import { Router } from "express";

import { CreateSpecificationController } from "@modules/cars/useCases/createSpecification/CreateSpecificationController";

import { ensureAutehnticated } from "../middlewares/middleware";

const specificationsRoutes = Router();

const createSpecificationController = new CreateSpecificationController();

specificationsRoutes.use(ensureAutehnticated);
specificationsRoutes.post("/", createSpecificationController.handle);

export { specificationsRoutes };
