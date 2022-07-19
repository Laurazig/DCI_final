import Order from "../models/order.js";
import createError from "http-errors";

export const orderPost = async (req, res, next) => {

    // Check if the same album already exists in the user's "orders" array.

   let existingOrder;

    //is the order the customer tried to add already exist?
   try{
    existingOrder = await Order.findOne(req.body);
   }catch{
    return next(createError(500, "Order could not be queried. Please try again!"))
   };


   // If you find an existing order with the same details, simply send back the id of the existing album in the server's response

   if(existingOrder) {
        res.json({ id: existingOrder._id });

        // If no, create a new order document and save it in the "orders" collection, and send back its id in the server's response
   } else { 
        let newOrder;
        try{
            newOrder = new Order(req.body);
            await newOrder.save();
        }catch{
            return next(createError(500, "Meal could not be created. Please try again!"))
        }

        res.json({id: newOrder._id});
   }

};
