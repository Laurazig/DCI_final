import Customer from "../models/customer.js";
import createError from "http-errors";

// ==============================================
// GET the logged in customer's data
// ==============================================

export const getCustomerData = async (req, res, next) => {
    const customerId = req.params.id;

    let foundCustomer;
    try {
        foundCustomer = await Customer.findById(customerId);
    } catch {
        return next(createError(500, "Could not query database. Please try again!"));
    }

    // If a user was found with the same id as the :id parameter...
    if (foundCustomer) {
        // Populate the data in model called Meal
        await foundCustomer.populate("meals", {_id: 1, mealName: 1, category: 1, amount: 1})

        const customerData = {
            firstName: foundCustomer.firstName,
            lastName: foundCustomer.lastName,
            meals: foundCustomer.meals
        }
        res.json(customerData);
    
    } else {
        next(createError(404, "Customer could not be created. Please try again"))
    }
}

// =======================================================
// POST a new meal to the meals page
// =======================================================

export const postMeals = async (req, res, next) => {
    const customerId = req.params.id; // customer id
    const mealId = req.body.id; // new meal id from the frontend

    // is the customer found?
    let foundCustomer;
    try{
        foundCustomer = await Customer.findById(customerId)
    }catch{
        return next(createError(500, "Customer could not be created. Please try again!"))
    };

    // are the meals found?
    const foundMeal = foundCustomer.meals.find( existingId => existingId === mealId);

    if(!foundMeal) {
        let updatedMeal;
        try{
            updatedMeal = await Customer.findByIdAndUpdate(
                customerId,
                {$push: {meals: mealId}},
                {new: true, runValidators: true}
            )
        }catch{
            return next(createError[500]("Could not be posted. Please try again!"));
        }
        // Populate all the meals and the new meal added
        await updatedMeal.populate("meals", {_id: 1, mealName: 1, category: 1, amount: 1})

        res.json.status(201).json({meals: updatedMeal.meals})

    } else {
        next(new createError[409]("The meal already exists in your collection!"));
    }

}

// =======================================================
// DELETE all meals from the page
// ==========================================================
export const deleteAllMeals = async (req, res, next) => {
    const customerId = req.params.id;

    let foundCustomer;
    try{
        foundCustomer = await Customer.findByIdAndUpdate(customerId, {meals: []}, {new: true, runValidators: true})
    }catch{
        return next(createError(500, "Meals could not be deleted. Please try again!"))
    }

     // Populate after you delete albums. However, it is not relevant.
     await foundCustomer.populate("meals");

    res.json(foundCustomer.meals)
}
// =============================================================
// DELETE a single meal from the page
// =============================================================
export const deleteSingleMeal = async (req, res, next) => {
    const customerId = req.params.id;
    const mealId = req.params.mealId;

    let foundCustomer;
    try{
        foundCustomer = await Customer.findByIdAndUpdate(
            customerId,
            {$pull: {meals: mealId}},
            {new: true, runValidators: true}
        )
    }catch{
        return next(createError(500, "The meal could not be deleted. Please try again!"))
    }

    // Populate after you delete a single album
    await foundCustomer.populate("meals");

    res.json({meals: foundCustomer.meals})
}


//=============================================================
// DELETE a customer account
// =============================================================

export const deleteAccount = async (req, res, next) => {
    const customerId = req.params.id;

    let foundCustomer;
    try{
        foundCustomer = await Customer.findByIdAndRemove(customerId)
    }catch{
        return next(createError(500, "Account could not be deleted. Please try again!"))
    }

    res.json({ message: `The account belong to ${foundCustomer.firstName} has been successfully deleted. Come back soon!` });
}