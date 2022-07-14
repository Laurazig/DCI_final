
import createError from "http-errors";
import Customer from "../models/customers.js";


export const registerController = async (req, res, next) => {
    const { username, password, firstName, lastName, email } = req.body;
    let foundCustomer;

    try{
        found = await Customer.findOne({
            username: username,
            password: password,
            firstName: firstName,
            lastName: lastName,
            emailAddress: email,
            meals: []
        }) 
        }catch {
            return next(createError(500, "could not query database. Please try again. please try again!"));
        }

    // If there is no user in the db with the username received from the frontend
    if (!foundCustomer) {
        // Create a new user based on data received from req.body
        const newCustomer = new User({
            id: uuid(),
            username: username,
            password: password,
            firstName: firstName,
            lastName: lastName,
            emailAddress: emailAddress,
            albums: []
        });

       try {
        await newCustomer.save();
       } catch {
        return next(createError(500, "couldn't create user, please try again. Please try again!"));
       } 
        res.status(201).json(newCustomer._id);
   
    } else {
        return next(createError(409, "Sorry, this username has been taken. Please choose another!"));
    }    
}
export default registerController;