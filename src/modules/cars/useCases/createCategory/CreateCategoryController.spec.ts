import { hash } from "bcrypt";
import request from "supertest";
import { DataSource } from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { app } from "@shared/infra/http/app";
import { AppDataSource } from "@shared/infra/typeorm/data-source";

let dataSource: DataSource;

describe("Create Category Controller", () => {
  beforeAll(async () => {
    dataSource = await AppDataSource.initialize();

    await dataSource.runMigrations();

    const id = uuidV4();
    const password = await hash("admin", 8);

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
  });

  afterAll(async () => {
    await dataSource.dropDatabase();
    await dataSource.destroy();
  });

  it("Should be able to create a new category", async () => {
    const responseToken = await request(app).post("/sessions").send({
      email: "admin@rentx.com.br",
      password: "admin",
    });

    const { token } = responseToken.body;

    const response = await request(app)
      .post("/categories")
      .send({
        name: "category supertest",
        description: "supertest",
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(response.status).toBe(201);
  });
});
