import express from "express";
import { LoginController, RegisterController } from "../controller/AuthController.controller";
export const AuthRouter = express.Router()

AuthRouter.post("/login", LoginController)
AuthRouter.post("/register", RegisterController)