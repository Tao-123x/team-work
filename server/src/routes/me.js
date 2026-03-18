import express from "express";
import { getMyOrders } from "../controllers/ordersController.js";

const router = express.Router();

router.get("/orders", getMyOrders);

export default router;
