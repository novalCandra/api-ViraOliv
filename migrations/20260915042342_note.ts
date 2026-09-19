import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("notes", function (table) {
        table.increments("id").primary();
        table.integer("id_user").unsigned().references("id").inTable("users").onDelete("CASCADE");
        table.string("title", 255);
        table.text("markdow");
        table.string("tags", 255);
    })
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists("notes")
}

