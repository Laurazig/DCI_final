import express from "express";
import {  getUserById,verifyUser } from "../controllers/usersController.js";

const router = express.Router();

router.get("/:id", getUserById); 

// router.patch("/:id/orders", updatedOrder);  

// router.patch("/:id/meals", updatedMeals);

// router.delete("/:id/meals", deleteAllMeals); 

// router.delete("/:id/meals/:mealId", deleteSingleMeal); 

// router.delete("/:id", deleteAccount);

router.post("/verifytoken", verifyUser)



export default router;