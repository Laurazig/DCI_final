import mongoose from "mongoose";

const { Schema } = mongoose;

const orderSchema = new Schema(
  {
    meals: [{ type: mongoose.Types.ObjectId, ref: "Meal" }],
    totalPrice: { type: Number, required: true },
    CreditCardNumber: { type: Number, required: true },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
