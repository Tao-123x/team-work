import express from "express";
import {
  getOrderDetail,
  getOrders,
  postAcceptOrder,
  postCancelOrder,
  postOrder,
  postOrderStatus
} from "../controllers/ordersController.js";

const router = express.Router();

router.get("/", getOrders);
router.post("/", postOrder);
router.get("/:id", getOrderDetail);
router.post("/:id/accept", postAcceptOrder);
router.post("/:id/status", postOrderStatus);
router.post("/:id/cancel", postCancelOrder);

export default router;
