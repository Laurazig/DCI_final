import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema( {

    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    confirmPassword: { type: String, required: true, },
    year: Number,
    month: Number,
    day: Number,
    street: String,
    houseNo: Number,
    zipCode: Number,
    city: String,
    // country: {type: String, require: true},
    meals: [ { type: mongoose.Schema.Types.ObjectId, ref: "meals" } ],
    orders: [ { type: mongoose.Schema.Types.ObjectId, ref: "orders" } ]
 
}, { timestamps: true } );

const User = mongoose.model( "users", userSchema );

export default User;
