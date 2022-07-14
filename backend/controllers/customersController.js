import Customer from "../models/customers.js";
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
        return next(createError(500, "findById -user could not be created (http-errors in userController) usersController"));
    }

    // If a user was found with the same id as the :id parameter...
    if (foundCustomer) {
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
    const newMeal = req.body; // new meal from the frontend

    // is the customer found?
    let foundCustomer;
    try{
        foundCustomer = await Customer.findById(customerId)
    }catch{
        return next(createError(500, "Customer could not be created. Please try again!"))
    };

    // are the meals found?
    const foundMeal = foundCustomer.meals.find( meal => {
        return (
            meal.pizza.toLowerCase() === newMeal.pizza.toLowerCase()
            && meal.lazagna.toLowerCase() === newMeal.lazagna.toLowerCase()
        )
    });

    if(!foundMeal) {
        let updatedMeal;
        try{
            updatedMeal = await Customer.findByIdAndUpdate(
                customerId,
                {$push: {meals: newMeal}},
                {new: true, runValidators: true}
            )
        }catch{
            return next(createError[500]("Could not be posted. Please try again!"));
        }

        res.json.status(201).json(updatedMeal.meals)

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
            {$pull: {meals: {_id: mealId}}},
            {new: true, runValidators: true}
        )
    }catch{
        return next(createError(500, "The meal could not be deleted. Please try again!"))
    }

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