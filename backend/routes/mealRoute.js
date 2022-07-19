import express from "express";
import { mealPost } from "../controllers/mealsController.js";

const router = express.Router();

router.post("/", mealPost);

export default router;

