import express from "express";
import {registerController} from "../controllers/registerController.js";
import requiredValues from "../controllers/requiredValues.js";
import checkValidation from "../validators/checkValidation.js";
import registerValidator from "../validators/registerValidator.js";


const router = express.Router();

router.post("/", registerController);

export default router;