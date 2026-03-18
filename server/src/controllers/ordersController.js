import {
  acceptOrder,
  cancelOrder,
  createOrder,
  getOrderById,
  listMyOrders,
  listOrders,
  updateOrderStatus
} from "../services/orderService.js";

export function getOrders(req, res) {
  res.json(listOrders(req.query));
}

export function getOrderDetail(req, res) {
  res.json(getOrderById(Number(req.params.id)));
}

export function postOrder(req, res) {
  const requiredFields = ["requester_id", "pickup_location", "dorm_building", "floor_no", "room_no"];
  const missingField = requiredFields.find((field) => !req.body[field]);

  if (missingField) {
    res.status(400).json({ message: `${missingField} is required` });
    return;
  }

  res.status(201).json(createOrder(req.body));
}

export function postAcceptOrder(req, res) {
  if (!req.body.helper_id) {
    res.status(400).json({ message: "helper_id is required" });
    return;
  }

  res.json(acceptOrder(Number(req.params.id), Number(req.body.helper_id)));
}

export function postOrderStatus(req, res) {
  const { operator_id, status } = req.body;

  if (!operator_id || !status) {
    res.status(400).json({ message: "operator_id and status are required" });
    return;
  }

  res.json(updateOrderStatus(Number(req.params.id), Number(operator_id), status));
}

export function postCancelOrder(req, res) {
  if (!req.body.requester_id) {
    res.status(400).json({ message: "requester_id is required" });
    return;
  }

  res.json(cancelOrder(Number(req.params.id), Number(req.body.requester_id), req.body.reason));
}

export function getMyOrders(req, res) {
  const { user_id, role } = req.query;

  if (!user_id || !role) {
    res.status(400).json({ message: "user_id and role are required" });
    return;
  }

  res.json(listMyOrders(Number(user_id), role));
}
