import { createUsers, selectUsers } from "../model/ModuleUsers.module";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { privateKeys } from "../private/jwt/jwt";
import validator from "validator"
interface LoginPayload {
    email: string;
    password: string;
}
interface GoogleType {
    name: string;
    email: string;
    password? : null
}
interface RegisterPayload {
    name: string;
    email: string;
    password: string;
}

// Extract shared validation
const validateEmail = (email: string): boolean => {
    return validator.isEmail(email);
};
export const serviceLogin = async (payload: LoginPayload) => {
    const {email, password } = payload

    const users = await selectUsers(email);

    if (!users || users[0].length) {
        throw new Error("USER_NOT_FOUND")
    }

    const hashPassword = await bcrypt.compare(password, users[0].password);

    if (!hashPassword) {
        throw new Error("Invalid Password or email")
    }

    const token = jwt.sign(
        {
            id: users[0].id,
            email: users[0].email
        },
        privateKeys,
        {
            algorithm: 'PS256',
            expiresIn: "1d"
        }
    )

    return { email, token }
}

export const serviceRegister = async (payload: RegisterPayload) => {
    const { name, email, password } = payload;
    if (!validateEmail(email)) {
        throw new Error("account add database")
    }

    const existingUser = await selectUsers(email);
    if (existingUser && existingUser.length > 0) {
        throw new Error("USER_ALREADY_EXISTS");
    }
    const hashPassword = bcrypt.hashSync(password, 10);
    await createUsers({
        name, email, password: hashPassword
    })
    return { name, email }
}

export const serviceGoogle = async (payload: GoogleType) => {
    const { name, email } = payload;

    if (!validateEmail(email)) {
        throw new Error("INVALID_EMAIL")
    }
    const exitingUsers = await selectUsers(email);

    if (exitingUsers && exitingUsers.length > 0) {
        return exitingUsers[0]
    }

    await createUsers({
        name,
        email,
        password : null
    })

    return {
        name,
        email
    }
}