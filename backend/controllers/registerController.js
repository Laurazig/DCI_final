
import createError from "http-errors";
import User from "../models/user.js";


export const registerController = async ( req, res, next ) =>
{

    const { firstName, lastName, email, password, confirmPassword, phone, street, houseNo, zipCode, city } = req.body;

    let foundUser;
    try
    {
        foundUser = await User.findOne( { email: email } );
    } catch {
        return next( createError( 500, "could not query database. please try again." ) );
    }

    // If there is no customer in the collections with the username received from the frontend
    if ( !foundUser )
    {
        // Create a new user based on data received from req.body
        const newUser = new User( {

            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            phone: phone,
            street: street,
            houseNo: houseNo,
            zipCode: zipCode,
            city: city,
            //   meals:[],
            //   orders:[]

        } );
        // Save the new user to the database
        try
        {
            await newUser.save();
        } catch {
            return next( createError( 500, "couldn't create user. please try again!" ) );
        }
        res.status( 201 ).json( { id: newUser._id } );

    } else
    {
        return next( createError( 409, "Sorry, this username has been taken. Please choose another!" ) );
    }
};
export default registerController;