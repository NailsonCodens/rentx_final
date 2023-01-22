import { Router } from "express";

import { CreateRentalController } from "@modules/rentals/useCases/createRental/CreateRentalController";
import { DevolutionRentalController } from "@modules/rentals/useCases/devolutionRental/DevolutionRentalController";
import { ListRentalsByUserController } from "@modules/rentals/useCases/listRentalsByUser/ListRentalsByUserController";

import { ensureAutehnticated } from "../middlewares/middleware";

const rentalRoutes = Router();

const createRentalController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController();
const listRentalsByUserController = new ListRentalsByUserController();

rentalRoutes.use(ensureAutehnticated);
rentalRoutes.post("/", createRentalController.handle);
rentalRoutes.post("/devolution/:id", devolutionRentalController.handle);
rentalRoutes.get("/user", listRentalsByUserController.handle);
export { rentalRoutes };
