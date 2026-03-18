import { request } from "./http";

export function fetchOrders(params = {}) {
  return request({
    url: "/api/orders",
    method: "GET",
    data: params
  });
}

export function fetchOrderDetail(orderId) {
  return request({
    url: `/api/orders/${orderId}`,
    method: "GET"
  });
}

export function createOrder(data) {
  return request({
    url: "/api/orders",
    method: "POST",
    data
  });
}

export function acceptOrder(orderId, helperId) {
  return request({
    url: `/api/orders/${orderId}/accept`,
    method: "POST",
    data: { helper_id: helperId }
  });
}

export function updateOrderStatus(orderId, operatorId, status) {
  return request({
    url: `/api/orders/${orderId}/status`,
    method: "POST",
    data: {
      operator_id: operatorId,
      status
    }
  });
}

export function cancelOrder(orderId, requesterId, reason) {
  return request({
    url: `/api/orders/${orderId}/cancel`,
    method: "POST",
    data: {
      requester_id: requesterId,
      reason
    }
  });
}

export function fetchMyOrders(userId, role) {
  return request({
    url: "/api/me/orders",
    method: "GET",
    data: {
      user_id: userId,
      role
    }
  });
}
