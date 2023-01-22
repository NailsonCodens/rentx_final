import { Router } from "express";
import multer from "multer";

import uploadConfig from "@config/upload";
import { CreateUserController } from "@modules/accounts/useCases/createUser/CreateUserController";
import { UpdateUserController } from "@modules/accounts/useCases/updateUserAvatar/UpdateUserController";

import { ensureAutehnticated } from "../middlewares/middleware";

const usersRoutes = Router();

const uploadAvatar = multer(uploadConfig.upload("./tmp/avatar"));

const createUserController = new CreateUserController();
const updateUserController = new UpdateUserController();

usersRoutes.post("/", createUserController.handle);
usersRoutes.use(ensureAutehnticated);

usersRoutes.patch(
  "/avatar",
  uploadAvatar.single("avatar"),
  updateUserController.handle
);

export { usersRoutes };
