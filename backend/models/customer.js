import mongoose from "mongoose";

const { Schema } = mongoose;

const customerSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: String,
    lastName: String,
    email: { type: String, required: true, unique: true },
    meals: [{ type: mongoose.Types.ObjectId, required: true, ref:"Meal" }],
}, {timestamps: true});

customerSchema.pre("save", async function(next){
    if(!this.firstName) {
        this.firstName = "John";
    };

    if(!this.lastName) {
        this.lastName = "Doe"
    };

    next();
})


const Customer = mongoose.model("Customer", customerSchema);

export default Customer;