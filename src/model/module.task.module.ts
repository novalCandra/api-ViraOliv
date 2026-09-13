import { dbKnex } from "./knex.js"
const db = dbKnex

interface BodyTaskModule {
    description: string;
    categorie_id: string;
}
export const taskGetModule = async () => {
    return db("task").select("task.id", "task.description", "users.name", "users.email", "categorie.status").join("users", "user_id", '=', "task.user_id").join("categorie", "categorie_id", "=", "categorie.status")
};

export const taskPostModule = async (body: BodyTaskModule, id: number) => {
    return db("task").insert({ "description": body.description, "categorie_id": body.categorie_id, "user_id" : id }).where("user_id", id)
};

export const taskUpdateModule = (body: BodyTaskModule, id: string | string[] | number) => {
    return db("task").update({ "description": body.description, "categorie_id": body.categorie_id}).where("id", id)
}


export const taskDeleteModule = async(id : any) => {
    return db("task").where("id", id).delete()
}