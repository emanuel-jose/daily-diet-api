import fastify from "fastify";
import cookie from "@fastify/cookie";
import fastifyJWT from "@fastify/jwt";
import { env } from "./env";

export const app = fastify();

app.register(fastifyJWT, { secret: env.JWT_SECRET });
app.register(cookie);
// app.register(transactionsRoutes, {
//   prefix: "transactions",
// });
