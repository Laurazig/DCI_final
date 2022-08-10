import Order from "../models/order.js";
import createError from "http-errors";

export const orderPost = async (req, res, next) => {

    // Check if the same order already exists in the user's "orders" array.
    //? not essential as ****most / ALL orders will be unique*** as the user has a different selection to choose from (not like albums from class). This will compare to users previous orders that will contain a different data. 

   let existingOrder;

    //does the order the customer tried to add already exist?
   try{
    existingOrder = await Order.findOne(req.body);
   }catch{
    return next(createError(500, "Order could not be queried. Please try again!"))
   };


   // If you find an existing order with the same details, simply send back the id of the existing order in the server's response

   if(existingOrder) {
        res.json({ id: existingOrder._id });

        // most /ALL orders: If not, create a new order document and save it in the "orders" collection, and send back its id in the server's response 
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
