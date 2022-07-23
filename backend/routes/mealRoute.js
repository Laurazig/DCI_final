import express from "express";
import { mealPost, mealGet } from "../controllers/mealsController.js";

const router = express.Router();

router.post("/", mealPost);
router.get("/", mealGet);


export default router;

