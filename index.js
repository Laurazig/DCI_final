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
import usersRoutes from "./routes/usersRoutes.js"
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
//import paymentRouter from "./routes/paymentRoute.js";

const app = express();
app.use(cors({origin:"http://localhost:3000"}));
app.use(express.json());

dotenv.config();

const portNumber = process.env.PORT || 3001;

// mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`);
// mongoose.connection.on("open", () => console.log("Database connection established"));
// mongoose.connection.on("error", () => console.error);

app.use(morgan("tiny"));
app.use("/register", registerRouter);
app.use("/login", loginRouter);
app.use("/meals", mealRouter);
app.use("/order", orderRouter);
app.use("/user", usersRoutes);
//app.use("/payment", paymentRouter);

// http://localhost:3001/Meal1_HummusBowl.jpg
app.use(express.static("assets"));

// Serve production code front-end/build folder
app.use(express.static(path.join(__dirname, "front-end/build")));
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "/front-end/build/index.html"));
});

// Global error handler
app.use(globalErrorHandler);

app.listen(portNumber, () => {
    console.log(`The server has started on port ${portNumber}`)
});