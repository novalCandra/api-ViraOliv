import { dbKnex } from "./knex.js"
const db = dbKnex

interface BodyTaskModule {
    title: string;
    due_date: string
    categorie_id: string;
    priority: string
}
export const taskGetModule = async () => {
    return db("task").select("task.id", "task.title", "users.name", "users.email", "categorie.status").join("users", "users.id", '=', "task.user_id").join("categorie", "categorie.id", "=", "task.categorie_id")
};

export const taskPostModule = async (body: BodyTaskModule, id: number) => {
    return db("task").insert({ "title": body.title, "due_date": body.due_date, "categorie_id": body.categorie_id, "priority": body.priority, "user_id": id }).where("user_id", id)
};

export const taskUpdateModule = (body: BodyTaskModule, id: string | string[] | number) => {
    return db("task").update({ "title": body.title, "due_date": body.due_date, "categorie_id": body.categorie_id, "priority": body.priority }).where("id", id)
}


export const taskDeleteModule = async (id: any) => {
    return db("task").where("id", id).delete()
}