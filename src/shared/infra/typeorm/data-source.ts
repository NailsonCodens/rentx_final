import "reflect-metadata";
import { DataSource } from "typeorm";

import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { UserTokens } from "@modules/accounts/infra/typeorm/entities/UserTokens";
import { Cars } from "@modules/cars/infra/typeorm/entities/Cars";
import { Category } from "@modules/cars/infra/typeorm/entities/Category";
import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";

export const AppDataSource = new DataSource({
  type: "postgres",
  host:
    process.env.NODE_ENV === "server" ? "database_ignite_tests" : "localhost",
  port: 5432,
  username: "docker",
  password: "ignite",
  database: process.env.NODE_ENV === "test" ? "rentx_test" : "rentx",
  synchronize: false,
  logging: false,
  migrations: ["./src/shared/infra/typeorm/migrations/*.ts"],
  entities: [Category, Specification, Cars, User, Rental, UserTokens],
});

AppDataSource.initialize().then(async () => {
  console.log("Connection initialized with database...");
});
