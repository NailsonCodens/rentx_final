import { Router } from "express";
import multer from "multer";

import uploadConfig from "@config/upload";
import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { CreateCarSpecificationController } from "@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController";
import { ListAvailableCarsController } from "@modules/cars/useCases/listAvailableCars/ListAvailableCarsController";
import { UploadCarImagesController } from "@modules/cars/useCases/uploadImage/UploadCarImagesController";

import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAutehnticated } from "../middlewares/ensureAuthenticate";

const carsRouter = Router();

const upload = multer(uploadConfig);

const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();
const createCarSpecificationController = new CreateCarSpecificationController();
const uploadCarImagesController = new UploadCarImagesController();

carsRouter.get("/available", listAvailableCarsController.handle);

carsRouter.use(ensureAutehnticated);
carsRouter.use(ensureAdmin);

carsRouter.post("/", createCarController.handle);
carsRouter.post("/specifications/:id", createCarSpecificationController.handle);
carsRouter.post(
  "/images/:id",
  upload.array("images"),
  uploadCarImagesController.handle
);

export { carsRouter };
