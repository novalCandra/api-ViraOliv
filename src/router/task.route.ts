import express from "express";
import VerifyToken from "../middleware/verifyToken.middleware.js";
import { createTaskController, deleteTaskController, getTaskController, updateTakcontroller } from "../controller/task.controller.js";
export const taskRouter = express.Router();
taskRouter.get("/task", VerifyToken, getTaskController);
taskRouter.post("/task", VerifyToken, createTaskController);
taskRouter.patch("/task/:id", VerifyToken, updateTakcontroller);
taskRouter.delete("/task/:id", VerifyToken, deleteTaskController);