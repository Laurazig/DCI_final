import express from "express";

const router = express.Router();

router.post("/", registerController);

export default router;