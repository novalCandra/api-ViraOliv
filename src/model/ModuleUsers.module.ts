import { knex, DbConfigKnex } from "./knex"
const db = knex(DbConfigKnex?.development)

interface TypeUsers {
    name: string;
    email: string;
    password: string
}

export const selectUsers = async (email: string) => {
    return db("users").select('id', 'email', 'password').where('email', email)
}

export const createUsers = async (body: TypeUsers) => {
    return db("users").insert({
        name: body.name,
        email: body.email,
        password: body.password
    })
}


export const profileUsers = async (id: number) => {
    return db("users").where('id', id)
}

export const profileUpdateUsers = async (id: number, body : any) => {
    return db("users").where('id', id).update({name : body.name, email : body.email})
}