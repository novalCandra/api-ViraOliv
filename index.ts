
import express from "express";
import { AuthRouter } from "./src/router/AuthRouter.router";
import { google } from "googleapis"
import { Request, Response } from "express";
import { serviceGoogle } from "./src/service/Auth.service";
import { UserRouter } from "./src/router/User.route";
import cors from "cors"
require('dotenv').config()
const app = express()
const port = 3001
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.get("/", (req, res) => {
    res.send('API VIRAOLIV Update')
})

app.use("/api", AuthRouter)
app.use("/api", UserRouter)

// QAUTH 3.0
const ouathClient3 = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    'http://localhost:3001/auth/google/callback'
)

const scopes = [
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/userinfo.profile'
]

const url = ouathClient3.generateAuthUrl({
    access_type: "online",
    include_granted_scopes: true,
    scope: scopes
})

app.get("/auth/google", (req, res) => {
    res.redirect(url)
})

// app.get("/auth/google/callback", async (req: Request, res: Response) => {
//     try {
//         const { code } = req.query;
//         const { tokens } = await ouathClient3.getToken(code);
//         ouathClient3.setCredentials(tokens)
//         const oauth2 = google.oauth2({
//             auth: ouathClient3,
//             version: "v2"
//         });

//         const { data } = await oauth2.userinfo.get();
//         if (!data) {
//             return res.status(403).json({
//                 status: false,
//                 message: "gagal login menggunakan google"
//             })
//         }

//         await serviceGoogle({
//             name: data.name,
//             email: data.email
//         })

//         return res.status(201).json({
//             status: true,
//             message: "success login google",
//             data: data
//         })
//     } catch (error) {
//         return res.status(500).json({
//             status: false,
//             message: "server error"
//         })
//     }
// })

app.listen(port, () => {
    return console.log(`BACK END BERJALAN FOR PORT : ${port}`)
})