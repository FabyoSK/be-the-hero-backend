import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("organizations", (table) => {
    table.string("id").primary();
    table.string("name").notNullable();
    table.string("whatsApp").notNullable();
    table.string("city").notNullable();
    table.string("ul").notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("organizations");
}
