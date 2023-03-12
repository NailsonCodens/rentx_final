import "reflect-metadata";
import { DataSource } from "typeorm";

import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { UserTokens } from "@modules/accounts/infra/typeorm/entities/UserTokens";
import { Cars } from "@modules/cars/infra/typeorm/entities/Cars";
import { CarsImage } from "@modules/cars/infra/typeorm/entities/CarsImage";
import { Category } from "@modules/cars/infra/typeorm/entities/Category";
import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";

import orm from "../../../../orm.json";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.NODE_ENV === "test" ? orm.DB_HOST_MIGRATION : orm.DB_HOST,
  port: orm.DB_PORT,
  username: orm.DB_USER,
  password: orm.DB_PASSWORD,
  database: process.env.NODE_ENV === "test" ? orm.DB_TEST : orm.DB,
  synchronize: false,
  logging: false,
  migrations: [orm.DB_PATH_MIGRATION],
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
console.log(process.env.NODE_ENV);
AppDataSource.initialize().then(async () => {
  console.log("Connection initialized with database...");
});
