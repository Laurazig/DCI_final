import User from "../models/user.js";
import createError from "http-errors";

export const updatedOrder = async (req, res, next) => {
    const customerId = req.params.id;
    const orderId = req.params.id;

    // Is the customer found?
    let foundCustomer;
    try{
        foundCustomer = await User.findById(customerId);
    }catch{
        return next(createError(500, "Customer could not be queried. Please try again!"));
    }


    // Is the order ordered by the customer already exist?
    const foundOrder = foundCustomer.orders.find(existingId => existingId == orderId); //! The orderId will be a composite id, which is userId + orderID

    // If the customer is found, then post the order of the customer
    if(!foundOrder) {
        let updatedOrder;
        try{
            updatedOrder = await User.findByIdAndUpdate(
                customerId,
                {$push: {orders: orderId}},
                {new: true, runValidators: true}
            )
        }catch{
            return next(createError(500, "Order could not be queried. Please try again!"))
        }

        // Populate the ordered meals
        await updatedOrder.populate("orders", {id: 1, mealName: 1, category: 1, amount: 1});

        res.status(201).json({orders: updatedOrder.orders});

    } else {
        next(createError(409, "The customer order could not be submitted. Please try again!"))
    }
}