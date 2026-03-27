import express from "express";
import { getMyOrders } from "../controllers/ordersController.js";
import { requireAuth } from "../middleware/auth.js";

const router = express.Router();

router.get("/orders", requireAuth, getMyOrders);

export default router;
