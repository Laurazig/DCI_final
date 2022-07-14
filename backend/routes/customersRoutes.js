import express from "express";
import { deleteAccount, deleteAllMeals, deleteSingleMeal, getCustomerData, postMeals } from "../controllers/customersController.js";

const router = express.Router();

router.get("/:id", getCustomerData);

router.patch("/:id/meals", postMeals);

router.delete("/:id/meals", deleteAllMeals);

router.delete("/:id/meals/:mealId", deleteSingleMeal);

router.delete("/:id", deleteAccount);

export default router;

