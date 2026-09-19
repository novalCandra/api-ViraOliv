import { ParsedQs } from "qs";
import { dbKnex } from "./knex.js";

const db = dbKnex

interface TypesBodyNotes {
    title: string;
    markdow: string;
    tags: string;
    id_user: number
}

export const getModuleDataNotes = async (id: number) => {
    return db("notes").select("notes.id", "notes.title", "notes.markdow", "notes.tags", "users.name as username").join("users", "users.id", "=", "notes.id_user").where("id_user", id)
}

export const getModuleDataNotesDetails = async (id: string | string[] | number) => {
    return db("notes").select("notes.title", "notes.markdow", "notes.tags", "users.name").where("notes.id", id).join("users", "users.id", "=", "notes.id_user")
}

export const getSearchDataNotes = async (title: string | ParsedQs | (string | ParsedQs)[] | undefined) => {
    return db("notes").select("notes.id", "notes.title", "notes.markdow", "notes.tags", "users.name as username").join("users", "users.id", "=", "notes.id_user").where('title', 'like', `%${title}%`)
}

export const createModuleDataNotes = async (body: TypesBodyNotes, id: number) => {
    return db("notes").insert({ "title": body.title, "markdow": body.markdow, "tags": body.tags, "id_user": id }).where("id_user", id)
}

export const updateModuleDataNotes = async (body: TypesBodyNotes, id: string | string[] | number) => {
    return db("notes").update({ "title": body.title, "markdow": body.markdow, "tags": body.tags, "id_user": body.id_user }).where("id", id)
}

export const deleteModuleUsers = async (id: string | string[] | number) => {
    return db("notes").delete().where("id", id)
}