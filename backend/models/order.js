import mongoose from "mongoose";

const { Schema } = mongoose;

const orderSchema = new Schema({
    //usersMeals: id, id, id,      //take id's from context in frontend
    date: {type: Number, required: true},
    CreditCardNumber: {type: String, required: true, unique: true},
}, {timestamps: true});

const Order = mongoose.model("orders", orderSchema);

export default Order;