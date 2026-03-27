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
  const requiredFields = ["pickup_location", "dorm_building", "floor_no", "room_no", "service_fee"];
  const missingField = requiredFields.find(
    (field) => req.body[field] === undefined || req.body[field] === null || req.body[field] === ""
  );

  if (missingField) {
    res.status(400).json({ message: `${missingField} is required` });
    return;
  }

  res.status(201).json(createOrder({ ...req.body, requester_id: req.user.id }));
}

export function postAcceptOrder(req, res) {
  res.json(acceptOrder(Number(req.params.id), req.user.id));
}

export function postOrderStatus(req, res) {
  const { status } = req.body;

  if (!status) {
    res.status(400).json({ message: "status is required" });
    return;
  }

  res.json(updateOrderStatus(Number(req.params.id), req.user.id, status));
}

export function postCancelOrder(req, res) {
  res.json(cancelOrder(Number(req.params.id), req.user.id, req.body.reason));
}

export function getMyOrders(req, res) {
  const { role } = req.query;

  if (!role) {
    res.status(400).json({ message: "role is required" });
    return;
  }

  res.json(listMyOrders(req.user.id, role));
}
