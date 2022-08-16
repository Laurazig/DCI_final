import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema( {

    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    street: { type: String, required: true },
    houseNo: { type: Number, required: true },
    zipCode: { type: Number, required: true },
    city:{ type: String, required: true },
    meals: [ { type: mongoose.Schema.Types.ObjectId, ref: "meals" } ],
    orders: [ { type: mongoose.Schema.Types.ObjectId, ref: "orders" } ]
 
}, { timestamps: true } );

const User = mongoose.model( "User", userSchema );

export default User;
