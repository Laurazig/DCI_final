import express from "express";
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";
import dotenv from "dotenv";

// Routes router 
import globalErrorHandler from "./middleware/globalErrorHandler.js";
import registerRouter from "./routes/registerRouter.js";
import loginRouter from "./routes/loginRouter.js";
import usersRouter from "./routes/usersRoutes.js";
import mealsRouter from "./routes/mealRoute.js";
import ordersRouter from "./routes/ordersRoutes.js";
import paymentRouter from "./routes/paymentRouter.js";

const app = express();
app.use(cors());
app.use(express.json());

dotenv.config();

mongoose.connect(`mongodb+srv://Yohannes:Haftey100@cluster0.uvleeqn.mongodb.net/flys-project?retryWrites=true&w=majority`);
mongoose.connection.on("open", () => console.log("Database has started"));
mongoose.connection.on("error", () => console.error);

app.use(morgan("tiny"));

app.use("/register", registerRouter);
app.use("/login", loginRouter);
app.use("/orders", ordersRouter);
app.use("/users", usersRouter); 
app.use("/meals", mealsRouter);
app.use("/payments", paymentRouter);

// http://localhost:3001/Meal1_HummusBowl.jpg
app.use(express.static("assets"));

// Global error handler
app.use(globalErrorHandler);


app.listen(3001, () => {
    console.log("The server has started on part 3001")
});