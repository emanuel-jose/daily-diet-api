import { env } from "./env";
import { app } from "./app";
import { knex } from "./database";

app.get("/hello", async () => {
  const tables = await knex("sqlite_schema").select("*");

  return tables;
});

app
  .listen({
    host: "0.0.0.0",
    port: env.PORT,
  })
  .then(() => console.log("HTTP is running!"));
