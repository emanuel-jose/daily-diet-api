import fastify from "fastify";
import cookie from "@fastify/cookie";
import fastifyJWT from "@fastify/jwt";
import { env } from "./env";
import { usersRoutes } from "./routes/users";
import { mealsRoutes } from "./routes/meals";

export const app = fastify();

app.register(fastifyJWT, { secret: env.JWT_SECRET });
app.register(cookie);
app.register(usersRoutes, { prefix: "users" });
app.register(mealsRoutes, { prefix: "meals" });
