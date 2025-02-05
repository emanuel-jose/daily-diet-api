import { it, beforeAll, afterAll, describe, expect, beforeEach } from "vitest";
import { execSync } from "node:child_process";
import { app } from "../src/app";
import request from "supertest";

describe("User routes", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(async () => {
    execSync("npm run knex migrate:rollback --all");
    execSync("npm run knex migrate:latest");
  });

  it("should be able to create a new user", async () => {
    await request(app.server)
      .post("/users")
      .send({
        name: "Fulano",
        email: "fulano@example.com",
        password: "123",
      })
      .expect(201);
  });

  it("should not be able to create a user with same email", async () => {
    await request(app.server)
      .post("/users")
      .send({
        name: "Fulano",
        email: "fulano@example.com",
        password: "123",
      })
      .expect(201);

    await request(app.server)
      .post("/users")
      .send({
        name: "Fulano",
        email: "fulano@example.com",
        password: "123",
      })
      .expect(400);
  });
});
