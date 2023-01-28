import { hash } from "bcrypt";
import request from "supertest";
import { DataSource } from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { app } from "@shared/infra/http/app";
import { AppDataSource } from "@shared/infra/typeorm/data-source";

let dataSource: DataSource;

describe("List Category Controller", () => {
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

  it("Should be able to list all categories", async () => {
    const responseToken = await request(app).post("/sessions").send({
      email: "admin@rentx.com.br",
      password: "admin",
    });

    const { refresh_token } = responseToken.body;

    await request(app)
      .post("/categories")
      .send({
        name: "category supertest list",
        description: "supertest",
      })
      .set({
        Authorization: `Bearer ${refresh_token}`,
      });

    const response = await request(app).get("/categories");

    expect(response.status).toBe(201);
    expect(response.body.length).toBe(1);
    expect(response.body[0]).toHaveProperty("id");
    expect(response.body[0].name).toEqual("category supertest list");
  });
});
