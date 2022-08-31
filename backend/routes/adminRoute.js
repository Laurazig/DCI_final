import express from "express";
import { countCustomers } from "../controllers/adminController.js";

const router = express.Router();

router.get("/:id/count", countCustomers)

export default router;