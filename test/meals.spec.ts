import { it, beforeAll, afterAll, describe, expect, beforeEach } from "vitest";
import { execSync } from "node:child_process";
import { app } from "../src/app";
import request from "supertest";

describe("Meals Routes", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    execSync("npm run knex migrate:rollback --all");
    await app.close();
  });

  beforeEach(async () => {
    execSync("npm run knex migrate:rollback --all");
    execSync("npm run knex migrate:latest");
  });

  it("should be able to create a new meal", async () => {
    const newUser = await request(app.server).post("/users").send({
      name: "Fulano",
      email: "fulano@example.com",
      password: "123",
    });

    const cookies = newUser.get("Set-Cookie");

    await request(app.server)
      .post("/meals")
      .set("Cookie", cookies as string[])
      .send({
        name: "Pipoca",
        description: "Comi dormindo",
        datetime: "2023-04-05",
        isWithinDiet: true,
      })
      .expect(201);
  });

  it("should be able to list all meals", async () => {
    const newUser = await request(app.server).post("/users").send({
      name: "Fulano",
      email: "fulano@example.com",
      password: "123",
    });

    const cookies = newUser.get("Set-Cookie");

    await request(app.server)
      .post("/meals")
      .set("Cookie", cookies as string[])
      .send({
        name: "Pipoca",
        description: "Comi dormindo",
        datetime: "2023-04-05",
        isWithinDiet: true,
      });

    const listOfMeals = await request(app.server)
      .get("/meals")
      .set("Cookie", cookies as string[])
      .expect(200);

    expect(listOfMeals.body.meals).toEqual([
      expect.objectContaining({
        name: "Pipoca",
        description: "Comi dormindo",
        datetime: "2023-04-05",
        is_within_diet: true,
      }),
    ]);
  });
});
