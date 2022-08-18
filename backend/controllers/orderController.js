import Order from "../models/order.js";
import createError from "http-errors";

export const orderPost = async (req, res, next) => {
    let newOrder;
    try{
        newOrder = new Order(req.body);
        await newOrder.save();
    }catch{
        return next(createError(500, "Order could not be created. Please try again! orderController.js"))
    }

    res.json({id: newOrder._id});

};

