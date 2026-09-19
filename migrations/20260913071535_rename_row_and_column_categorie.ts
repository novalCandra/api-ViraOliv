import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.alterTable("categorie", function (table) {
        table.enum("status", ["todo", "inprogress", "done"]).alter()
        table.dropColumn("priority")
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.alterTable("categorie", function (table) {
        table
            .enum("status", ["todo", "inprogress", "done"])
            .alter();
        table.dropColumn("priority")
    })
}

