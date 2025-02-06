import { it, beforeAll, afterAll, describe, expect, beforeEach } from "vitest";
import { execSync } from "node:child_process";
import { app } from "../src/app";
import request from "supertest";

describe("Metric routes", () => {
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

  it("should be able to get all metrics of the meals", async () => {
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
        name: "Salada",
        description: "salada de alface",
        datetime: "2025-02-06T02:32:26.808Z",
        isWithinDiet: true,
      });

    await request(app.server)
      .post("/meals")
      .set("Cookie", cookies as string[])
      .send({
        name: "Cookies integral",
        description: "feito pela mamãe",
        datetime: "2025-02-06T02:32:26.808Z",
        isWithinDiet: true,
      });

    await request(app.server)
      .post("/meals")
      .set("Cookie", cookies as string[])
      .send({
        name: "Miojo",
        description: "Lanche da madruga",
        datetime: "2025-02-06T02:32:26.808Z",
        isWithinDiet: false,
      });

    const metrics = await request(app.server)
      .get("/metrics")
      .set("Cookie", cookies as string[])
      .expect(200);

    expect(metrics.body.metrics).toEqual({
      total_meals: 3,
      within_diet_meals: 2,
      out_of_diet_meals: 1,
      best_diet_streak: 2,
    });
  });
});
