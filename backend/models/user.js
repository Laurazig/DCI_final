//Laura: which model to keep
import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({

    firstName:String,
    lastName: String,
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    confirmPassword: String, 
    year: Number,
    month: Number,
    day: Number,
    street: String,
    houseNo: Number,
    zipCode: Number,
    city: String,
    // meals: [{ type: mongoose.Types.ObjectId, required: true, ref:"Meal" }],
    // orders: [{type: mongoose.Types.ObjectId, required: true, ref:"Oder"}]
    
}, {timestamps: true});

const User = mongoose.model("User", userSchema);

export default User;
