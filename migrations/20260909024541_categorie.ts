import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema
    .createTable('categorie', function(table) {
        table.increments('id').primary();
        table.enum('status', ["do", "decide", "delegate", "delete"]);
        table.timestamps(true, true)
    })
}


export async function down(knex: Knex): Promise<void> {
    return await knex.schema.dropTableIfExists("categories")
}

