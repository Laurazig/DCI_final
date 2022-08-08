
import createError from "http-errors";
import User from "../models/user.js";


export const registerController = async (req, res, next) => {
// console.log(`now working - console.log req.body ${req.body}`)
    const {firstName, lastName, email, password, confirmPassword, year, month, day, street, houseNo, zipCode, city} = req.body;

    let foundCustomer;
    try{
        foundCustomer = await User.findOne({email: email});
        }catch {
            return next(createError(500, "could not query database. please try again. **registerController.js line14** "));
        }

    // If there is no customer in the collections with the username received from the frontend
    if (!foundCustomer) {
        // Create a new user based on data received from req.body
        const newCustomer = new User({

        //   firstName: firstName,
        //   lastName: lastName,
          email: email,
          password: password,
        //   confirmPassword: confirmPassword,
        //   year: year,
        //   month: month,
        //   day: day,
        //   street: street,
        //   houseNo: houseNo,
        //   zipCode: zipCode,
        //   city: city
          // meals:[],
           /*  orders: [] */

        });
console.log(`console log registerController newCustomer ${newCustomer}`)
       try {
        await newCustomer.save(); 
       } catch {
        return next(createError(500, "couldn't create user. please try again! **registerController.js line42**"));
       } 
        res.status(201).json(newCustomer/* ._id */);
   
    } else {
        return next(createError(409, "Sorry, this username has been taken. Please choose another! **registerController.js line47**"));
    }    
}
export default registerController;