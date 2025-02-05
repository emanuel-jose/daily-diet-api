import { env } from "./env";
import { app } from "./app";
import { knex } from "./database";

app.setErrorHandler((error, request, reply) => {
  console.error(error);
  reply.status(500).send({ error: "Internal Server Error" });
});

app
  .listen({
    host: "0.0.0.0",
    port: env.PORT,
  })
  .then(() => console.log("HTTP is running!"));
