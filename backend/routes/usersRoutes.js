import express from "express";
import { deleteAccount, deleteAllMeals, deleteSingleMeal, getMealsData, updatedMeals, updatedOrder } from "../controllers/usersController.js";

const router = express.Router();

router.get("/:id");

router.get("/:id", getMealsData);

router.patch("/:id/meals", updatedMeals);

router.delete("/:id/meals", deleteAllMeals); //users with premium |employees

router.delete("/:id/meals/:mealId", deleteSingleMeal);

router.delete("/:id", deleteAccount);

router.patch("/:id/orders", updatedOrder);

export default router;

