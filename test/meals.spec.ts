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

  it("should be able to list specif meal", async () => {
    const newUser = await request(app.server).post("/users").send({
      name: "Fulano",
      email: "fulano@example.com",
      password: "123",
    });

    const cookies = newUser.get("Set-Cookie");

    const newMeal = await request(app.server)
      .post("/meals")
      .set("Cookie", cookies as string[])
      .send({
        name: "Pipoca",
        description: "Comi dormindo",
        datetime: "2023-04-05",
        isWithinDiet: true,
      });

    const mealId = newMeal.body.meal.id;

    const getSpecifiMealById = await request(app.server)
      .get(`/meals/${mealId}`)
      .set("Cookie", cookies as string[])
      .expect(200);

    expect(getSpecifiMealById.body.meal).toEqual(
      expect.objectContaining({
        name: "Pipoca",
        description: "Comi dormindo",
        datetime: "2023-04-05",
        is_within_diet: true,
      })
    );
  });

  it("should be able to delete a specific meal", async () => {
    const newUser = await request(app.server).post("/users").send({
      name: "Fulano",
      email: "fulano@example.com",
      password: "123",
    });

    const cookies = newUser.get("Set-Cookie");

    const newMeal = await request(app.server)
      .post("/meals")
      .set("Cookie", cookies as string[])
      .send({
        name: "Pipoca",
        description: "Comi dormindo",
        datetime: "2023-04-05",
        isWithinDiet: true,
      });

    const mealId = newMeal.body.meal.id;

    await request(app.server)
      .delete(`/meals/${mealId}`)
      .set("Cookie", cookies as string[])
      .expect(204);

    const listOfMeals = await request(app.server)
      .get("/meals")
      .set("Cookie", cookies as string[]);

    expect(listOfMeals.body.meals).toEqual([]);
  });

  it("should be able to edit a specifc  meal", async () => {
    const newUser = await request(app.server).post("/users").send({
      name: "Fulano",
      email: "fulano@example.com",
      password: "123",
    });

    const cookies = newUser.get("Set-Cookie");

    const newMeal = await request(app.server)
      .post("/meals")
      .set("Cookie", cookies as string[])
      .send({
        name: "Pipoca",
        description: "Comi dormindo",
        datetime: "2025-02-06T02:32:26.808Z",
        isWithinDiet: false,
      });

    const mealId = newMeal.body.meal.id;

    await request(app.server)
      .put(`/meals/${mealId}`)
      .set("Cookie", cookies as string[])
      .send({
        name: "Arroz",
        description: "integral",
        datetime: "2025-02-06T02:32:26.808Z",
        isWithinDiet: true,
      })
      .expect(204);

    const getEditedMeal = await request(app.server)
      .get(`/meals/${mealId}`)
      .set("Cookie", cookies as string[]);

    expect(getEditedMeal.body.meal).toEqual(
      expect.objectContaining({
        name: "Arroz",
        description: "integral",
        datetime: "2025-02-06T02:32:26.808Z",
        is_within_diet: true,
      })
    );
  });
});
