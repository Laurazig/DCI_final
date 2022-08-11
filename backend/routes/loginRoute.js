import express from "express";
import {loginController} from "../controllers/loginController.js";
import requiredValues from "../controllers/requiredValues.js";
import checkValidation from "../validators/checkValidation.js";

const router = express.Router();

router.post("/", loginController);

export default router;