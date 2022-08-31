import express from "express";
import { countCustomerOrder } from "../controllers/adminController.js";
import admin from "../middleware/admin.js";

const router = express.Router();

router.use(admin);

router.get("/:id/count", countCustomerOrder)
//router.get("/:id/orders/count", countOrderPerUser)

export default router;