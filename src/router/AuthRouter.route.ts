import express from "express";
import { LoginController, RegisterController, verifyKodeOTPController } from "../controller/AuthController.controller.js";
export const AuthRouter = express.Router()

AuthRouter.post("/login", LoginController)
AuthRouter.post("/register", RegisterController)
AuthRouter.post("/verify", verifyKodeOTPController)