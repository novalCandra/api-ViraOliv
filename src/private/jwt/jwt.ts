import fs from "node:fs"
require("dotenv").config();

const typePrivateKeys: string | undefined = process.env.PRIVATE_KEY!
const typePublicPrivateKeys: string | undefined = process.env.PUBLIC_KEY!
// Private KEY and Public
export const privateKeys = fs.readFileSync(typePrivateKeys, 'utf-8')
export const publicKeys = fs.readFileSync(typePublicPrivateKeys, 'utf-8');