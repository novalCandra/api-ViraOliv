import { google } from "googleapis"
import { ParsedQs } from "qs"
// QAUTH 3.0
export const ouathClient3 = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    'http://localhost:3001/api/auth/google/callback'
)

export const scopes = [
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/userinfo.profile'
]

export const url = ouathClient3.generateAuthUrl({
    access_type: "online",
    include_granted_scopes: true,
    scope: scopes
})

export default function getToken(code : any){
    return ouathClient3.getToken(code)
}