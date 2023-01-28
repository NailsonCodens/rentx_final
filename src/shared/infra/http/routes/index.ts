import { Router } from "express";

import { authRoutes } from "./authenticate.routes";
import { carsRouter } from "./cars.routes";
import { categoryRoutes } from "./categories.routes";
import { passwordRoutes } from "./password.routes";
import { rentalRoutes } from "./rental.routes";
import { specificationsRoutes } from "./specifications.routes";
import { usersRoutes } from "./users.routes";

const routers = Router();
routers.use("/sessions", authRoutes);
routers.use("/users", usersRoutes);

routers.use("/categories", categoryRoutes);
routers.use("/specifications", specificationsRoutes);
routers.use("/cars", carsRouter);
routers.use("/rentals", rentalRoutes);
routers.use("/password", passwordRoutes);
export default routers;
