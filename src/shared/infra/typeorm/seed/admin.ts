import { hash } from "bcrypt";
import { v4 as uuidV4 } from "uuid";

import { User } from "@modules/accounts/infra/typeorm/entities/User";

import { AppDataSource } from "../data-sourceMigration";

async function createAdmin() {
  const id = uuidV4();
  const password = await hash("admin", 8);

  const dataSource = await AppDataSource.initialize();

  await dataSource
    .getRepository(User)
    .createQueryBuilder()
    .insert()
    .into(User)
    .values({
      id,
      name: "Admin",
      email: "admin@rentx.com.br",
      password,
      driver_license: "XXX-123",
      is_admin: true,
      created_at: new Date(),
    })
    .execute();
}

createAdmin().then(() => console.log("Admin created"));
