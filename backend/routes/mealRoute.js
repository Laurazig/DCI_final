import express from "express";
import { mealPost, mealGet } from "../controllers/mealsController.js";
import requiredValues from "../controllers/requiredValues.js";
import checkValidation from "../validators/checkValidation.js";
import mealValidator from "../validators/mealValidator.js";

const router = express.Router();

router.post("/", mealPost);

router.get("/", mealGet);


export default router;

