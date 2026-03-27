import { createReview } from "../services/reviewService.js";

export function postReview(req, res) {
  const { order_id, rating } = req.body;

  if (!order_id || rating === undefined) {
    res.status(400).json({ message: "order_id and rating are required" });
    return;
  }

  res.status(201).json(
    createReview({
      order_id: Number(order_id),
      actor_id: req.user.id,
      rating: Number(rating),
      comment: req.body.comment
    })
  );
}
