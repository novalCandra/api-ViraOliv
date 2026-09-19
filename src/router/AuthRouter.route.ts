import express from "express";
import { authGoogleController, callbackAuthGoogle, LoginController, RegisterController, verifyKodeOTPController } from "../controller/AuthController.controller.js";
export const AuthRouter = express.Router()

AuthRouter.post("/login", LoginController)
AuthRouter.post("/register", RegisterController)
AuthRouter.get("/auth/google", authGoogleController);
AuthRouter.get("/auth/google/callback", callbackAuthGoogle)
AuthRouter.post("/verify", verifyKodeOTPController)