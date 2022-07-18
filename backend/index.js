import express from "express";
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";
import dotenv from "dotenv";

import globalErrorHandler from "./middleware/globalErrorHandler.js";
import registerRouter from "./routes/registerRouter.js";
import loginRouter from "./routes/loginRouter.js";
import customersRouter from "./routes/customersRoutes.js";
import employeesRouter from "./routes/employeesRoutes.js";
import mealsRouter from "./routes/mealRoute.js";
import ordersRouter from "./routes/ordersRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());

dotenv.config();

mongoose.connect(`mongodb+srv://Yohannes:Haftey100@cluster0.uvleeqn.mongodb.net/flys-project?retryWrites=true&w=majority`);
mongoose.connection.on("open", () => console.log("Database has started"));
mongoose.connection.on("error", () => console.error);

app.use(morgan("tiny"));
// Customers path
app.use("/register", registerRouter);
app.use("/login", loginRouter);
app.use("/customers", customersRouter);
app.use("/orders", ordersRouter);
// Admin path
app.use("/employees", employeesRouter);
app.use("/meals", mealsRouter);

app.use(globalErrorHandler);


app.listen(3001, () => {
    console.log("The server has started on part 3001")
});