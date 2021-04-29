import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("causes", (table) => {
    table.string("id").primary();
    table.string("name").notNullable();
    table.string("description").notNullable();
    table.decimal("value").notNullable();

    table
      .string("organization_id")
      .notNullable()
      .references("id")
      .inTable("organizations")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");

    table.string("organization_name").notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("causes");
}
