import User from "../models/user.js";
import Meal from "../models/meal.js";
import createError from "http-errors";

export const orderPost = async (req, res, next) => {
  const userId = req.params.id;
  const mealId = req.params.id;

  let foundUser;
  try {
    foundUser = await User.find(userId);
  } catch {
    return next(
      createError(500, "Could not query database. Please try again!")
    );
  }

  if (foundUser) {
    let foundMeal;
    try {
      foundMeal = await Meal.find(mealId);
    } catch {
      return next(
        createError(500, "Database could not find meals. Please try again")
      );
    }

    if (foundMeal) {
      const newOrder = new User({
        orders: [mealId],
      });

      await newOrder.save();
    }
  }

  res.json({ id: newOrder._id });
};
