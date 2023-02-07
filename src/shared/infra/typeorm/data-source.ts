import "reflect-metadata";
import { DataSource } from "typeorm";

import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { UserTokens } from "@modules/accounts/infra/typeorm/entities/UserTokens";
import { Cars } from "@modules/cars/infra/typeorm/entities/Cars";
import { CarsImage } from "@modules/cars/infra/typeorm/entities/CarsImage";
import { Category } from "@modules/cars/infra/typeorm/entities/Category";
import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";

export const AppDataSource = new DataSource({
  type: "postgres",
  host:
    process.env.NODE_ENV === "test"
      ? process.env.DB_HOST_TEST
      : process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database:
    process.env.NODE_ENV === "test" ? process.env.DB_TEST : process.env.DB,
  synchronize: false,
  logging: false,
  migrations: [process.env.DB_PATH_MIGRATIONS],
  entities: [
    Category,
    Specification,
    Cars,
    CarsImage,
    User,
    Rental,
    UserTokens,
  ],
});

AppDataSource.initialize().then(async () => {
  console.log("Connection initialized with database...");
});
