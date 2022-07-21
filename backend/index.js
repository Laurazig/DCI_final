import express from "express";
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";
import dotenv from "dotenv";

// Routes router 
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

mongoose.connect(`mongodb+srv://Laura123:Laura123@cluster0.uvleeqn.mongodb.net/flys-project?retryWrites=true&w=majority`);


mongoose.connection.on("open", () => console.log("Database has started"));
mongoose.connection.on("error", () => console.error);

app.use(morgan("tiny"));
// General users (Customers and Employees) endpoints
app.use("/register", registerRouter);
app.use("/login", loginRouter);
// Customers endpoint
app.use("/customers", customersRouter);
app.use("/orders", ordersRouter);
// Employees endpoint
app.use("/employees", employeesRouter); // ! we need to discuss with the group
app.use("/meals", mealsRouter);

// Global error handler
app.use(globalErrorHandler);


app.listen(3001, () => {
    console.log("The server has started on part 3001")
});