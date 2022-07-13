import express from "express";
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";
import dotenv from "dotenv";

const app = express();
app.use(cors());
app.use(express.json());

dotenv.config();

mongoose.connect(`mongodb+srv://Yohannes:Haftey100@cluster0.uvleeqn.mongodb.net/flys-project?retryWrites=true&w=majority`);
mongoose.connection("open", () => console.log("Database has started"));
mongoose.connection("error", () => console.error);

app.use(morgan("tiny"));
app.use("/register", registerRouter);
app.use("/login", loginRouter);

app.use(globalErrorHandler);

app.listen(3001, () => {
    console.log("The server has started on part 3001")
})