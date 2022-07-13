//import User from "../models/user.js";
import createError from "http-errors";

// ==============================================
// GET the logged in user's data
// ==============================================

export const getUserData = async (req, res, next) => {
    // Take the :id parameter from the request path ("/users/:id/albums")
    const userId = req.params.id;
    // Try to find a user in the database file's "users" array with the same id
    // If you find a user object with the correct id, make a copy and put it in the "foundUser" variable
    // If you do not find the user, "foundUser" = undefined
    //const foundUser = db.data.users.find(user => user.id === userId);
    let foundUser;
    try {
        // foundUser = await User.findOne({_id:userId})
        foundUser = await User.findById(userId);
    } catch {
        return next(createError(500, "findById -user could not be created (http-errors in userController) usersController"));
    }

    // If a user was found with the same id as the :id parameter...
    if (foundUser) {
        // Send in the response back to the frontend:
        //  - firstName
        //  - list of albums
        const userData = {
            firstName: foundUser.firstName,
            //albums: foundUser.albums
        }
        res.json(userData);
    
    // If no user was found with the same id as the :id parameter...
    // Create an error object with a relevant message and statusCode, and pass it to the error handling middleware
    } else {
        // next(new createError.InternalServerError("user could not be created. Please try again"))
        next(createError(404, "user could not be created. Please try again"))
    }
}

// =======================================================
// POST a new album to the logged in user's "albums" list
// =======================================================



// =======================================================
// DELETE all albums from the logged in user's "albums" list  02.06.22
// ==========================================================


// =============================================================
// DELETE a single album from the logged in user's "albums" list     02.06.22
// =============================================================
