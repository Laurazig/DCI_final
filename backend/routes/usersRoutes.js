import express from "express";
import {  getUserById,verifyUser } from "../controllers/usersController.js";

const router = express.Router();


router.get("/:id", getUserById); 

router.post("/verifytoken", verifyUser)



export default router;