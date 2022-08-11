
import createError from "http-errors";
import User from "../models/user.js";

export const loginController = async  (req, res, next) => {
    // Take the username and password the user tried to log in with
    const { email, password } = req.body;

    console.log( "Check it body",req.body)

   let foundUser;
   try{
    foundUser = await User.findOne({
        email: email,
        password: password})
   } catch {
    return next(createError(500, "could not query database. Please try again!"));
    }

    console.log(foundUser);

    if (foundUser) {
        res.json({id: foundUser._id});

    } else {
        return next(createError(401, "You could not be logged in. Please try again"));
    }
};
