import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('categories', function (table) {
        table.increments('id_categories');
        table.enum('status', ['do', 'decide', 'delegate', 'delete']).nullable();
    })
}


export async function down(knex: Knex): Promise<void> {
}

