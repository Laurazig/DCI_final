
import createError from "http-errors";
import User from "../models/user.js";


export const registerController = async (req, res, next) => {
    const { username, password, firstName, lastName, email } = req.body;


    let foundCustomer;

    try{
        foundCustomer = await User.findOne({username: username}) 
        }catch {
            return next(createError(500, "could not query database. please try again."));
        }

    // If there is no customer in the collections with the username received from the frontend
    if (!foundCustomer) {
        // Create a new user based on data received from req.body
        const newCustomer = new User({
            username: username,
            password: password,
            firstName: firstName,
            lastName: lastName,
            email: email,
            orders: []
        });

       try {
        await newCustomer.save();
       } catch {
        return next(createError(500, "couldn't create user. please try again!"));
       } 
        res.status(201).json(newCustomer._id);
   
    } else {
        return next(createError(409, "Sorry, this username has been taken. Please choose another!"));
    }    
}
export default registerController;