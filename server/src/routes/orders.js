import express from "express";
import {
  getOrderDetail,
  getOrders,
  postAcceptOrder,
  postCancelOrder,
  postOrder,
  postOrderStatus
} from "../controllers/ordersController.js";
import { requireAuth } from "../middleware/auth.js";

const router = express.Router();

router.get("/", getOrders);
router.post("/", requireAuth, postOrder);
router.get("/:id", getOrderDetail);
router.post("/:id/accept", requireAuth, postAcceptOrder);
router.post("/:id/status", requireAuth, postOrderStatus);
router.post("/:id/cancel", requireAuth, postCancelOrder);

export default router;
