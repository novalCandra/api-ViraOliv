import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema
        .createTable("task", function (table) {
            table.increments("id").primary();
            table.text("description");
            table.integer("categorie_id").unsigned().notNullable().references('id').inTable("categorie").onDelete("CASCADE")
            table.timestamps(true, true);
        })
}


export async function down(knex: Knex): Promise<void> {
    return await knex.schema.dropTableIfExists("task")
}

