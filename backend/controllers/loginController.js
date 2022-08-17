import User from "../models/user.js";
import createError from "http-errors";
import bcrypt from "bcryptjs";

export const loginController = async  (req, res, next) => {
    // Take the username and password the user tried to log in with
    const { email, password } = req.body;
   let foundUser;
   try{
    foundUser = await User.findOne({email: email})
    //bcrypt.compare()  entered password with database
   } catch {
    return next(createError(500, "could not query database. Please try again!"));
    }

    console.log(foundUser);

    if (foundUser ===null) {
        return next(createError(401, "You could not be logged in. User with that email does not exist"));
        //return res.status(400).json({message:"No user found"});

        
    }

    const checkPassword = await bcrypt.compare(password, foundUser.password);

    if(checkPassword){
        return res.json({id: foundUser._id, firstName: foundUser.firstName, lastName: foundUser.lastName});
     } else {
        return next(createError(401, "You could not be logged in. Inccorrect password"));
     }
};
