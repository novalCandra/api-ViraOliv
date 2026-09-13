import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.alterTable("task", function (table) {
        table.integer("user_id").unsigned().references("id").inTable("users").onDelete("CASCADE")
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.alterTable("task", function (table) {
        table.dropColumn("user_id")
    })
}

