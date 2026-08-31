import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.alterTable('users', function(table){
        table.renameColumn("username", "name")
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.alterTable("users", function(table){
        table.renameColumn("username", "name")
    })
}

