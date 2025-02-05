import { env } from "./env";
import { app } from "./app";

app.get("/hello", () => {
  return "Hello World";
});

app
  .listen({
    host: "0.0.0.0",
    port: env.PORT,
  })
  .then(() => console.log("HTTP is running!"));
