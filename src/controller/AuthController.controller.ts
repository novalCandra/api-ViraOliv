import { Request, Response } from "express";
import { serviceGoogle, serviceLogin, serviceRegister } from "../service/Auth.service.js";
import nodemailer from "nodemailer"
import getToken, { ouathClient3, url } from "../middleware/google.middleware.js";
import { google } from "googleapis";
require("dotenv").config()
const optStore: { [key: string]: any } = {};
export const LoginController = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(402).json({
                status: false,
                message: "email and password wajib required"
            })
        }
        const data = await serviceLogin({ email, password });
        return res.status(201).json({
            status: true,
            message: "success login users",
            data: data
        })

    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error
        })
    }
}

export const RegisterController = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({
                status: false,
                message: "name email and password required"
            })
        }

        // KODE OTP
        function KodeRandomOTP() {
            return Math.floor(100000 + Math.random() * 900000).toString();
        }

        const otp = KodeRandomOTP();

        function storeOTP(emailAddr: string, otpcode: string) {
            optStore[emailAddr] = {
                code: otpcode,
                expiresAt: Date.now() + 10 * 60 * 1000
            }
        }
        storeOTP(email, otp)
        // transport
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS
            }
        })

        // info
        await transporter.sendMail({
            from: "ViraOliv",
            to: email,
            subject: `KODE OTP`,
            text: `Please Privasi Kode Otp Account ${email}`,
            html: `
            <h2>KODE OTP : ${otp}</h2>
            `
        })
        await serviceRegister({ name, email, password })
        return res.status(201).json({
            status: true,
            message: "success create users",
        })
    } catch (error: any) {
        if (error.message === "USER_ALREADY_EXISTS") {
            return res.status(409).json({
                status: false,
                message: "User already exists"
            });
        }
        return res.status(500).json({
            status: false,
            message: "Server error"
        })
    }
}

export const verifyKodeOTPController = async (req: Request, res: Response) => {
    try {
        const { email, userKodeOtp } = req.body;
        if (!email || !userKodeOtp) {
            return res.status(400).json({
                status: false,
                message: "otp required"
            })
        }
        const storedData = optStore[email]
        if (!storedData) {
            return res.status(400).json({
                status: false,
                message: "OTP not found or expired"
            })
        }

        if (Date.now() > storedData.expiresAt) {
            delete optStore[email]
            return res.status(400).json({
                status: false,
                message: "OTP expired"
            })
        }

        if (storedData.code !== userKodeOtp) {
            console.log(storedData.code)
            return res.status(400).json({
                status: false,
                message: "OTP incorrect"
            })
        }

        delete optStore[email];
        return res.status(200).json({
            status: true,
            message: "OTP verified successfully",
            verified: true
        })
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error
        })
    }
}

export const authGoogleController = async (_: Request, res: Response) => {
    try {
        res.redirect(url)
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            status: false,
            message: error
        })
    }
}

export const callbackAuthGoogle = async (req: Request, res: Response) => {
    try {
        const { code } = req.query;
        console.log(typeof code)
        const { tokens } = await getToken(code);
        ouathClient3.setCredentials(tokens)
        const oauth2 = google.oauth2({
            auth: ouathClient3,
            version: "v2"
        });

        const { data } = await oauth2.userinfo.get();
        if (!data) {
            return res.status(403).json({
                status: false,
                message: "gagal login menggunakan google"
            })
        }

        await serviceGoogle({
            name: data.name!,
            email: data.email!,
        })

        return res.status(201).json({
            status: true,
            message: "success login google",
            data: data
        })
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "server error",
            messageError: error
        })
    }
}