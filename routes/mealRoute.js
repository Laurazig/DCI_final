import express from "express";
import { mealGet } from "../controllers/mealsController.js";
import requiredValues from "../controllers/requiredValues.js";
import checkValidation from "../validators/checkValidation.js";
import mealValidator from "../validators/mealValidator.js";

const router = express.Router();

router.get("/", mealGet);

// router.post("/", mealPost);

export default router;

