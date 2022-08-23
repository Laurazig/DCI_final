import User from "../models/user.js";
import createError from "http-errors";
import jwt from "jsonwebtoken"

//=============================================================
// GET user by ID
// =============================================================
export const getUserById = async (req, res, next) => {
    const userId = req.params.id;
    // user found?
    let foundUser;
    try{
        foundUser = await User.findById(userId);
        if (foundUser===null){
            return next(createError(500, "User with that ID could not be found. Please try again!"));
        } else {
            return res.status(200).json({
                firstName: foundUser.firstName,
                lastName: foundUser.lastName,
                street: foundUser.street,
                houseNo: foundUser.houseNo,
                city: foundUser.city,
                zipCode: foundUser.zipCode
            })
        }
    }catch{
        return next(createError(500, "User could not be queried. Please try again!"));
    }

}

//=============================================================
//  not using yet - PATCH an order
// =============================================================

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
    const foundOrder = foundCustomer.orders.find(existingId => existingId == orderId);

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
/* =======20Aug */

export const verifyUser=async(req,res,next)=>{
    try{
        const token =req.headers.token;
  const decode = jwt.verify(token,process.env.SECRET_KEY)
  console.log(decode);
  if(decode){
let user = await User.findById(decode.id).populate({path: "orders", populate: {path: "meals", model: "meals"}})
res.send({
    success:true,
     data:user})
  }
    }catch(err){
res.send({success:false, message:err.message})
    }
}




