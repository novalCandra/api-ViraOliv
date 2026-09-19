import express from "express";
import VerifyToken from "../middleware/verifyToken.middleware.js";
import { deleteNotedController, getNotedController, getNotedDetails, getNotedSearch, posrNotedController, updateNotedController } from "../controller/noted.controller.js";

export const NotedRouter = express.Router();
NotedRouter.get("/noted", VerifyToken, getNotedController);
NotedRouter.get("/search-noted", VerifyToken, getNotedSearch);
NotedRouter.post("/noted", VerifyToken, posrNotedController);
NotedRouter.get("/noted/:id", VerifyToken, getNotedDetails);
NotedRouter.put("/noted/:id", VerifyToken, updateNotedController);
NotedRouter.delete("/noted/:id", VerifyToken, deleteNotedController)