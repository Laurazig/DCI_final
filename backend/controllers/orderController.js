import Order from "../models/order.js";
import Meal from "../models/meal.js";
import createError from "http-errors";

export const orderPost = async (req, res, next) => {
  const mealId = req.params.id;
  let foundOrder;
  try {
    foundOrder = await Meal.find(mealId);
  } catch {
    return next(
      createError(500, "Could not query database. Please try again!")
    );
  }

  if (foundOrder) {
    const newOrder = new Order({
      meals: [],
    });

    try {
      await newOrder.save();
    } catch {
      return next(
        createError(500, "Database could not create an order. Please try again")
      );
    }
  }

  res.json({ id: newOrder._id });
};
