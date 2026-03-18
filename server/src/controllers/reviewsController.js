import { createReview } from "../services/reviewService.js";

export function postReview(req, res) {
  const { order_id, requester_id, helper_id, rating } = req.body;

  if (!order_id || !requester_id || !helper_id || !rating) {
    res.status(400).json({ message: "order_id, requester_id, helper_id and rating are required" });
    return;
  }

  res.status(201).json(createReview(req.body));
}
