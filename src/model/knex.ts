import DbConfigKnex from "../../knexfile.js"
import knex from "knex"

export const dbKnex = knex(DbConfigKnex)
