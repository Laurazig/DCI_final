import mongoose from "mongoose";

const { Schema } = mongoose;

const orderSchema = new Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    telephone: {type: Number, required: true},
    city: {type: String, require: true},
    StreetAddress: {type: String, require: true},
    ZipCode: {type: String, require: true},
    province: {type: String, require: true},
    country: {type: String, require: true},
    amount: {type: Number, required: true},
    date: {type: Number, required: true},
    CreditCardNumber: {type: String, required: true, unique: true},
    SecurityCode: {type: String, required: true, unique: true},
    ExpirationMonth: {type: Number, required: true},
    ExpirationYear: {type: Number, required: true},
}, {timestamps: true});

const Order = mongoose.model("orders", orderSchema);

export default Order;