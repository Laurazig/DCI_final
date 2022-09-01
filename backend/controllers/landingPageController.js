import Meal from "../models/meal.js";
import createError from "http-errors";
import { response } from "express";

const getFeaturedMeals = async (req, res, next) => {
    try{
        const featuredMeals = await Meal.find({rating: 5}.limit(3));

        return req.json({featured: featuredMeals});
    }catch{
        return next(createError(500, "Meals could not be queried!"))
    }
}

export default getFeaturedMeals;