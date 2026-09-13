import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.table("categorie", function(table) {
        table.enum("priority", ['normal', 'hight', 'low'])
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.table("categories", function(table) {
        table.dropColumn("priority")
    })
}

