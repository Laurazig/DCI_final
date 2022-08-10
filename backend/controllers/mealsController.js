import Meal from "../models/meal.js";
import createError from "http-errors";

//=====================================
//POST route not used. Needed for admin to add meals in database (postman?)
//=====================================

export const mealPost = async (req, res, next) => {

    // Check if the same meal already exists in the companies "meals" array. 

   let existingMeal;
   //Does the particular "meal" that the employee tried to add, already exists in the meal page?
   try{
    existingMeal = await Meal.findOne(req.body);
   }catch{
    return next(createError(500, "Meal could not be queried. Please try again!"))
   };

     // If you find an existing meal with the same details, simply send back the id of the existing meal in the server's response.

   if(existingMeal) {
        res.json({ id: existingMeal._id });

        // If not, create a new meal document and save it in the "meals" collection, and send back its id in the server's response.
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

//=====================================
//GET route - get all meals from database & display on meals page
//=====================================

export const mealGet = async (req, res, next)=>{
const meals = await Meal.find()
res.send(meals)

}

