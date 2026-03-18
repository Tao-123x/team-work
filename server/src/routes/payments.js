import express from "express";
import { postManualPayment } from "../controllers/paymentsController.js";

const router = express.Router();

router.post("/manual-confirm", postManualPayment);

export default router;
