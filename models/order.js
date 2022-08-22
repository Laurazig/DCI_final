import mongoose from "mongoose";

const { Schema } = mongoose;

const orderSchema = new Schema({
    userId: {type: String, required: true},
    usersMeals: {type: String, required: true},     //take id's from context in frontend  - id, id, id
    //date: {type: Number, required: true},
    //CardNumLast4Dig: {type: String, required: true, unique: true},
}, {timestamps: true});

const Order = mongoose.model("Order", orderSchema);

export default Order;