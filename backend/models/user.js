import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema( {

    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    confirmPassword: { type: String, required: true, },
    street: String,
    houseNo: Number,
    zipCode: Number,
    city: String,
    // meals: [ { type: mongoose.Types.ObjectId, ref: "Meal" } ],
    orders: [ { type: mongoose.Types.ObjectId, ref: "Order" } ]
 
}, { timestamps: true } );

const User = mongoose.model( "User", userSchema );

export default User;
