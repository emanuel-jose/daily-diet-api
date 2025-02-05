import type { FastifyInstance } from "fastify";
import { knex } from "../database";
import { z } from "zod";
import { randomUUID } from "node:crypto";
import bcrypt from "bcrypt";

export async function usersRoutes(app: FastifyInstance) {
  app.post("/", async (request, reply) => {
    const createUserBodySchema = z.object({
      name: z.string().min(1, "name not be empty"),
      email: z.string().email("invalid email"),
      password: z
        .string()
        .min(3, "password must be equal or longer than 3 characters"),
    });

    try {
      const { name, email, password } = createUserBodySchema.parse(
        request.body
      );

      const emailAlreadyExist = await knex("users")
        .where("email", email)
        .first();

      if (emailAlreadyExist) {
        return reply.status(400).send({ message: "email already exist!" });
      }

      const sessionId = randomUUID();
      const userId = randomUUID();

      const token = app.jwt.sign({ userId });
      const hashPassword = await bcrypt.hash(password, 10);

      reply.cookie("sessionId", sessionId, {
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      });
      reply.cookie("token", token);

      await knex("users").insert({
        id: userId,
        session_id: sessionId,
        name,
        email,
        password: hashPassword,
      });

      return reply.status(201).send({ token });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const formattedErrors = error.issues.map((issue) => ({
          path: issue.path.join("."),
          message: issue.message,
        }));

        reply.status(400).send({ errors: formattedErrors });
      }
    }
  });
}
