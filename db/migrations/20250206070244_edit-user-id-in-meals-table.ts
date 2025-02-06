import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable("meals", (table) => {
    table.dropForeign(["user_id"]);
    table.uuid("user_id").alter().references("users.id").notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable("meals", (table) => {
    table.dropForeign(["user_id"]);
    table.uuid("user_id").alter();
  });
}
