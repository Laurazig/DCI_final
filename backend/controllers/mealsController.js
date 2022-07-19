import Meal from "../models/meal.js";
import createError from "http-errors";

export const mealPost = async (req, res, next) => {

    // Check if the same meal already exists in the user's "meals" array. Remember, only one from each meals has to be on the meals page to show the availability of the meal to the customers.

   let existingMeal;
   //is the particular "meal" that the employee tried to add already exist in the meal page?
   try{
    existingMeal = await Meal.findOne(req.body);
   }catch{
    return next(createError(500, "Meal could not be queried. Please try again!"))
   };

     // If you find an existing meal with the same details, simply send back the id of the existing meal in the server's response.

   if(existingMeal) {
        res.json({ id: existingMeal._id });

        // If no, create a new meal document and save it in the "meals" collection, and send back its id in the server's response.
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

