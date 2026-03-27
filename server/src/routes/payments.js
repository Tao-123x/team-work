import express from "express";
import { postManualPayment } from "../controllers/paymentsController.js";
import { requireAuth } from "../middleware/auth.js";

const router = express.Router();

router.post("/manual-confirm", requireAuth, postManualPayment);

export default router;
