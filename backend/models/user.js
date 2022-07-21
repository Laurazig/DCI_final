import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
    //username: { type: String, required: true, unique: true },
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
    
}, {timestamps: true});

/* userSchema.pre("save", async function(next){
    if(!this.firstName) {
        this.firstName = "John";
    };

    if(!this.lastName) {
        this.lastName = "Doe"
    };

    next();
}) */


const User = mongoose.model("User", userSchema);

export default User;
