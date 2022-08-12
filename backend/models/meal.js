import mongoose from "mongoose";

const { Schema } = mongoose;

const mealSchema = new Schema({
    id: {type: String, required: true},  //is it number or string?
    meal: {type: String, required: true}, // would be good to call it mealName
    img: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true, min: 3}
}, {timestamps: true});

const Meal = mongoose.model("Meal", mealSchema);

export default Meal;