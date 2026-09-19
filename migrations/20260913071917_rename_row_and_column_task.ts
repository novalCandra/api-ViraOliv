import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.table("task", function (table) {
        table.enum("priority", ['normal', 'hight', 'low'])
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.table("task", function (table) {
        table.dropColumn("priority")
    })
}

