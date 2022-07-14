import Meal from "../models/meal.js";
import createError from "http-errors";

export const mealPost = async (req, res, next) => {
   let existingMeal;
   try{
    existingMeal = await Meal.findOne(req.body);
   }catch{
    return next(createError(500, "Meal could not be queried. Please try again!"))
   };

   // if the particular meal is finished, you need to add additional meal in the else condition

   if(existingMeal) {
        res.json({ id: existingMeal._id });
   } else {
        let newMeal;
        try{
            newMeal = new Meal(req.body);
            await newMeal.save();
        }catch{
            return next(createError(500, "Meal could not be created. Please try again!"))
        }

        res.json({id: newMeal._id})
   }

};

