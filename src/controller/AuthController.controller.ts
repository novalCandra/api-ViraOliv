import { Request, Response } from "express";
import { serviceLogin, serviceRegister } from "../service/Auth.service";
require("dotenv").config()
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
        const result = await serviceRegister({ name, email, password })
        return res.status(201).json({
            status: true,
            message: "success create users",
            data: result
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