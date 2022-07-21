import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({

    firstName:{ type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    confirmPassword:  { type: String, required: true, unique:true },
    year: Number,
    month: Number,
    day: Number,
    street: String,
    houseNo: Number,
    zipCode: Number,
    city: String,
    meals: [{ type: mongoose.Types.ObjectId, required: true, ref:"Meal" }],
    orders: [{type: mongoose.Types.ObjectId, required: true, ref:"Oder"}]
    
    
    /*firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    confirmPassword: {type: String, required: true},
    year: {type: Number, required: true },
    month: {type: Number, required: true },
    day: {type: Number, required: true },
    street: {type: String, required: true },
    houseNo: {type: Number, required: true },
    zipCode: {type: Number, required: true },
    city: {type: String, required: true },*/

    
}, {timestamps: true});

const User = mongoose.model("User", userSchema);

export default User;
