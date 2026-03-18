import { defineStore } from "pinia";
import { fetchOrderDetail, fetchOrders, fetchMyOrders } from "../api/orders";

export const useOrderStore = defineStore("order", {
  state: () => ({
    hallOrders: [],
    myRequests: [],
    myAcceptedOrders: [],
    currentOrder: null,
    loading: false
  }),
  actions: {
    async loadHallOrders(filters = {}) {
      this.loading = true;
      try {
        const response = await fetchOrders(filters);
        this.hallOrders = response.list || [];
      } finally {
        this.loading = false;
      }
    },
    async loadOrderDetail(orderId) {
      this.loading = true;
      try {
        this.currentOrder = await fetchOrderDetail(orderId);
      } finally {
        this.loading = false;
      }
    },
    async loadMyOrders(userId) {
      this.loading = true;
      try {
        const [requests, accepted] = await Promise.all([
          fetchMyOrders(userId, "requester"),
          fetchMyOrders(userId, "helper")
        ]);

        this.myRequests = requests.list || [];
        this.myAcceptedOrders = accepted.list || [];
      } finally {
        this.loading = false;
      }
    }
  }
});
