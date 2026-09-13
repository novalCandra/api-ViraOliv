import { dbKnex } from "./knex.js"
const db = dbKnex;

export const getModuleDataCategories = async () => {
    return db("categorie").select()
}
