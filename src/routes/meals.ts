import type { FastifyInstance } from "fastify";
import { knex } from "../database";
import { z } from "zod";
import { randomUUID } from "node:crypto";
import { checkSessionIdAndTokenExists } from "../middleware/check-session-id-and-token-exists";

export async function mealsRoutes(app: FastifyInstance) {
  app.addHook("preHandler", checkSessionIdAndTokenExists);

  app.post("/", async (request, reply) => {
    const createMealBodySchema = z.object({
      name: z.string(),
      description: z.string(),
      datetime: z.string(),
      isWithinDiet: z.boolean(),
    });

    try {
      const { name, description, datetime, isWithinDiet } =
        createMealBodySchema.parse(request.body);

      const { token } = request.cookies;

      const decoded = app.jwt.verify<{ userId: string }>(token as string);
      const userId = decoded.userId;

      const meal = {
        id: randomUUID(),
        user_id: userId,
        name,
        description,
        datetime,
        is_within_diet: isWithinDiet,
      };

      await knex("meals").insert(meal);

      return reply.status(201).send({ meal });
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

  app.get("/", async (request, reply) => {
    const { token } = request.cookies;
    const userId = app.jwt.verify<{ userId: string }>(token as string).userId;

    const meals = (await knex("meals").where("user_id", userId).select()).map(
      (meal) => ({
        ...meal,
        is_within_diet: isNaN(Number(meal.is_within_diet))
          ? meal.is_within_diet
          : Number(meal.is_within_diet) === 1,
      })
    );

    return { meals };
  });
}
