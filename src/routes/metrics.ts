import type { FastifyInstance } from "fastify";
import { knex } from "../database";
import { checkSessionIdAndTokenExists } from "../middleware/check-session-id-and-token-exists";

export async function metricsRoutes(app: FastifyInstance) {
  app.addHook("preHandler", checkSessionIdAndTokenExists);

  app.get("/", async (request, reply) => {
    const { token } = request.cookies;
    const userId = app.jwt.verify<{ userId: string }>(token as string).userId;

    const meals = await knex("meals").where("user_id", userId).select();

    const totalMeals = meals.length;
    const withinDiet = meals.filter((meal) => meal.is_within_diet).length;
    const outOfDiet = totalMeals - withinDiet;

    let currentStreak = 0;
    let bestStreak = 0;

    for (const meal of meals) {
      if (meal.is_within_diet) {
        currentStreak++;
        bestStreak = Math.max(bestStreak, currentStreak);
      } else {
        currentStreak = 0;
      }
    }

    return reply.send({
      metrics: {
        total_meals: totalMeals,
        within_diet_meals: withinDiet,
        out_of_diet_meals: outOfDiet,
        best_diet_streak: bestStreak,
      },
    });
  });
}
