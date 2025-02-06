import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("meals", (table) => {
    table.uuid("id").primary();
    table.uuid("user_id");
    table.text("name").notNullable();
    table.text("description").notNullable();
    table.timestamp("datetime").defaultTo(knex.fn.now()).notNullable();
    table.boolean("is_within_diet").notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now()).notNullable();
    table.timestamp("update_at");
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("meals");
}
