import mongoose from "mongoose";

const { Schema } = mongoose;

const orderSchema = new Schema({
    userId: {type: String, required: true},
    usersMeals: [{type: mongoose.Schema.Types.ObjectId, ref: "meals" }],     //array 3 ids 
     //CardNumLast4Dig: {type: String, required: true, unique: true},
}, {timestamps: true});

//const Order = mongoose.model("Order", orderSchema);

export default orderSchema;