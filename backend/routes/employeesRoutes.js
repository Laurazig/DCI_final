import express from "express";
import { deleteAccount, deleteAllMeals, deleteSingleMeal, getMealsData, updatedMeals } from "../controllers/employeesController.js";

const router = express.Router();

router.get("/:id", getMealsData);

router.patch("/:id/meals", updatedMeals);

router.delete("/:id/meals", deleteAllMeals);

router.delete("/:id/meals/:mealId", deleteSingleMeal);

router.delete("/:id", deleteAccount);

export default router;

