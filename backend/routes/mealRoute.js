import express from "express";
import { mealPost, mealGet } from "../controllers/mealsController.js";

const router = express.Router();

router.post("/", mealPost);  //not using- only for employees
router.get("/", mealGet);


export default router;

