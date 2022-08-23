import mongoose from "mongoose";
import bcrypt from "bcryptjs";
//import jwt from "jsonwebtoken";
//import orderSchema from "./order";

const { Schema } = mongoose;

const userSchema = new Schema( {

    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    street: { type: String, required: true },
    houseNo: { type: Number, required: true },
    zipCode: { type: String, required: true },
    city:{ type: String, required: true },
    //orders: [ { type: orderSchema } ]
 
}, { timestamps: true } );

userSchema.pre("save", async function(next) {
    // Securing the password using salting round. The salt rounds are the number of times the password is hashed. The higher the salt rounds, the more secure the password is, however, it takes longer time to hash the password.
    const secureUserPassword = await bcrypt.hash(this.password, 12);
    this.password = secureUserPassword;

    next();
});

const User = mongoose.model( "User", userSchema );

export default User;
