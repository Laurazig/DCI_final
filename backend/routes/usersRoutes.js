import express from "express";
import { deleteAccount, deleteAllMeals, deleteSingleMeal, getMealsData, updatedMeals, updatedOrder } from "../controllers/usersController.js";

const router = express.Router();
//3 levels- 1 standard users / 2 premium users / 3 admin (Laura feels we don't need this)

router.get("/:id", getMealsData); //1,2,3

router.patch("/:id/meals", updatedMeals);//1,2,3

router.delete("/:id/meals", deleteAllMeals); // 3 (if this is the whole company meal database)

router.delete("/:id/meals/:mealId", deleteSingleMeal); //1,2,3

router.delete("/:id", deleteAccount);// 1,2,3

router.patch("/:id/orders", updatedOrder);  //1,2,3

export default router;