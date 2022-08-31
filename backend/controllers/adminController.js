import createError from "http-errors";
import User from "../models/user.js";
import Order from "../models/order.js";

export const countCustomerOrder = async (req, res, next) => {
        let numberOfDocuments;
      try {
        numberOfDocuments = await User.countDocuments({});
    } catch {
        return next(createError(500, "Database could not be queried. Please try again"));
    }

    res.json({ count: numberOfDocuments });
};

export const countOrderPerUser = async (req, res, next) => {
    const userId = req.params.id;
    const orderId = req.prams.id;

    let numberOfDocuments;;
    try {
        numberOfDocuments = await User.countDocuments(userId)
    } catch {
        return next(createError(500, "Database could not be queried. Please try again"));
    }

    res.json({ count: numberOfDocuments });
};