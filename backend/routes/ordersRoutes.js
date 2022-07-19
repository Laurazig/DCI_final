import express from "express";
import { orderPost } from "../controllers/orderController.js";

const router = express.Router();

router.post("/", orderPost);

export default router;