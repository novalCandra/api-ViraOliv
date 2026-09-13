import express from "express";
import VerifyToken from "../middleware/verifyToken.middleware.js";
import { getDataCategoriesUses } from "../controller/categorie.controller.js";
export const CategoriesRouter = express.Router();
CategoriesRouter.get("/categorie", VerifyToken, getDataCategoriesUses)