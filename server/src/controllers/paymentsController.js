import { createManualPayment } from "../services/paymentService.js";

export function postManualPayment(req, res) {
  const { order_id } = req.body;

  if (!order_id) {
    res.status(400).json({ message: "order_id is required" });
    return;
  }

  res.status(201).json(
    createManualPayment({
      order_id: Number(order_id),
      actor_id: req.user.id,
      payment_method: req.body.payment_method
    })
  );
}
