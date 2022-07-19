import express from "express";
import { updatedOrder } from "../controllers/customersController.js";

const router = express.Router();

router.get("/:id"); // This will be done later on

router.patch("/:id/orders", updatedOrder);


export default router;