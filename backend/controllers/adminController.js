import createError from "http-errors";
import User from "../models/user.js";

export const countCustomers = async (req, res, next) => {
    let numberOfDocuments;

    try {
        numberOfDocuments = await User.countDocuments({});
    } catch {
        return next(createError(500, "Database could not be queried. Please try again"));
    }

    res.json({ count: numberOfDocuments });
};