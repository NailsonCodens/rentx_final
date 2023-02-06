import { Router } from "express";
import multer from "multer";

import uploadConfig from "@config/upload";
import { CreateUserController } from "@modules/accounts/useCases/createUser/CreateUserController";
import { ProfileUserController } from "@modules/accounts/useCases/profileUser/ProfileUserController";
import { UpdateUserController } from "@modules/accounts/useCases/updateUserAvatar/UpdateUserController";

import { ensureAutehnticated } from "../middlewares/ensureAuthenticate";

const usersRoutes = Router();

const uploadAvatar = multer(uploadConfig);

const createUserController = new CreateUserController();
const updateUserController = new UpdateUserController();
const profileUserController = new ProfileUserController();

usersRoutes.post("/", createUserController.handle);
usersRoutes.use(ensureAutehnticated);

usersRoutes.patch(
  "/avatar",
  uploadAvatar.single("avatar"),
  updateUserController.handle
);
usersRoutes.get("/profile", profileUserController.handle);

export { usersRoutes };
