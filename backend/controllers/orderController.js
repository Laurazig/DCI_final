import Order from "../models/order.js";
import Meal from "../models/meal.js";
import createError from "http-errors";
import User from "../models/user.js";

//===========================================================
// Post customer ordered meals
//===========================================================

export const orderPost = async (req, res, next) => {
  
  try{
    const user = await User.findById(req.body.userId)

    if(user) {
      const order = new Order({
        meals: req.body.meals,
        totalPrice: req.body.total
      })
    
      await order.save()

      user.orders.push(order._id)
      await user.save()
      
      res.json({success: true, data: order})
    } else{
      res.json({success: false, message: "You need to log in first."})
    }
  }catch(err){
    next(err)
  }
};

//===========================================================
// Delete a single meal ordered by the customer
//===========================================================
export const deleteSingleOrderedMeal = async (req, res, next) => {
  const selectedMealId = req.params.id;

  console.log("The ID of the meal:", selectedMealId)

  let foundOrderedMeal;
  try{
      foundOrderedMeal = await Order.findByIdAndRemove(selectedMealId); 
     
  }catch{
      return next(createError(500, "Database could not be queried. Please try again"))
  }

  let updateOrderedMeal;
  try{
      updateOrderedMeal = await Order.find({})
  }catch{
      return next(createError(403, "Selected meal could not be deleted. please try again!"))
  }
  res.status(201).json({meals: updateOrderedMeal})
}
