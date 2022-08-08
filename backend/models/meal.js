import mongoose from "mongoose";

const { Schema } = mongoose;

const mealSchema = new Schema({
    mealName: {type: String, required: true},
    category: {type: String, required: true},
    amount: {type: Number, required: true, min: 3}
}, {timestamps: true});

const Meal = mongoose.model("meals", mealSchema);

export default Meal;