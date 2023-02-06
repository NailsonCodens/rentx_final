import { Router } from "express";
import multer from "multer";

import { CreateCategoryController } from "@modules/cars/useCases/createCategory/CreateCategoryController";
import { ImportCategoriesController } from "@modules/cars/useCases/importCategories/ImportCategoriesController";
import { ListCategoriesController } from "@modules/cars/useCases/listCategories/ListCategoriesController";

import { ensureAutehnticated } from "../middlewares/ensureAuthenticate";

const categoryRoutes = Router();

const upload = multer({
  dest: "./tmp",
});

const createCategoryController = new CreateCategoryController();
const importCategoriesController = new ImportCategoriesController();
const listCategoriesController = new ListCategoriesController();

categoryRoutes.get("/", listCategoriesController.handle);

categoryRoutes.use(ensureAutehnticated);
categoryRoutes.post("/", createCategoryController.handle);

categoryRoutes.post(
  "/import",
  upload.single("file"),
  importCategoriesController.handle
);

export { categoryRoutes };
