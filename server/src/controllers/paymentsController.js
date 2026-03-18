import { createManualPayment } from "../services/paymentService.js";

export function postManualPayment(req, res) {
  const { order_id, payer_id, payee_id, amount } = req.body;

  if (!order_id || !payer_id || !payee_id || amount === undefined) {
    res.status(400).json({ message: "order_id, payer_id, payee_id and amount are required" });
    return;
  }

  res.status(201).json(createManualPayment(req.body));
}
