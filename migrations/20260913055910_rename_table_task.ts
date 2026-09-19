import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.table("task", function(table) {
        table.string("title");
        table.string("due_date");
    })
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.table("task", function(table) {
        table.dropColumn("title");
        table.dropColumn("due_date");
    })
}

