import express from "express";
import VerifyToken from "../middleware/verifyToken.middleware.js";
import { ProfileUpdateController, ProfileUsersController } from "../controller/User.controller.js";

export const UserRouter = express.Router();
UserRouter.get("/profile", VerifyToken, ProfileUsersController)
UserRouter.put("/profile/update", VerifyToken, ProfileUpdateController)