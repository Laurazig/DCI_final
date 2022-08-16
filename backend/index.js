import express from "express";
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";
import dotenv from "dotenv";

// Routes router 
import globalErrorHandler from "./middleware/globalErrorHandler.js";

import registerRouter from "./routes/registerRoute.js";
import loginRouter from "./routes/loginRoute.js";
import mealRouter from "./routes/mealRoute.js";
import orderRouter from "./routes/ordersRoute.js";
//import paymentRouter from "./routes/paymentRoute.js";

const app = express();
app.use(cors({origin:"http://localhost:3000"}));
app.use(express.json());

dotenv.config();
console.log("This is the result:",mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`));

mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`);

mongoose.connection.on("open", () => console.log("Database connection established"));
mongoose.connection.on("error", () => console.error);

app.use(morgan("tiny"));
app.use("/register", registerRouter);
app.use("/login", loginRouter);
app.use("/meals", mealRouter);
app.use("/order", orderRouter);
//app.use("/payment", paymentRouter);

// http://localhost:3001/Meal1_HummusBowl.jpg
app.use(express.static("assets"));

// Global error handler
app.use(globalErrorHandler);

app.listen(3001, () => {
    console.log("The server has started on part 3001")
});