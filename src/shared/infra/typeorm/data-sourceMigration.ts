import "reflect-metadata";
import { DataSource } from "typeorm";

import { User } from "@modules/accounts/infra/typeorm/entities/User";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "docker",
  password: "ignite",
  database: "rentx",
  synchronize: false,
  logging: false,
  migrations: ["./src/shared/infra/typeorm/migrations/*.ts"],
  entities: [User],
});

AppDataSource.initialize().then(async () => {
  console.log("Connection initialized with database...");
});
