<script setup>
import { computed, onMounted } from "vue";
import StatusTag from "../../components/status-tag/StatusTag.vue";
import { acceptOrder, updateOrderStatus } from "../../api/orders";
import { useOrderStore } from "../../store/order";
import { useUserStore } from "../../store/user";
import { formatDormAddress, formatMoney } from "../../utils/format";

const orderStore = useOrderStore();
const userStore = useUserStore();

const order = computed(() => orderStore.currentOrder);
const nextStatus = computed(() => {
  if (!order.value) return "";
  if (order.value.status === "accepted") return "picked_up";
  if (order.value.status === "picked_up") return "delivered";
  if (order.value.status === "delivered") return "completed";
  return "";
});

onMounted(() => {
  const pages = getCurrentPages();
  const current = pages[pages.length - 1];
  const id = current?.options?.id;
  if (id) {
    orderStore.loadOrderDetail(id);
  }
});

async function handleAccept() {
  await acceptOrder(order.value.id, userStore.currentUser.user_id);
  await orderStore.loadOrderDetail(order.value.id);
}

async function handleNextStatus() {
  await updateOrderStatus(order.value.id, userStore.currentUser.user_id, nextStatus.value);
  await orderStore.loadOrderDetail(order.value.id);
}
</script>

<template>
  <view class="page">
    <view v-if="!order" class="empty">Loading order...</view>
    <view v-else class="card">
      <view class="header">
        <text class="order-no">{{ order.order_no }}</text>
        <StatusTag :status="order.status" />
      </view>
      <view class="item"><text class="label">Pickup</text><text>{{ order.pickup_location }}</text></view>
      <view class="item"><text class="label">Deliver to</text><text>{{ formatDormAddress(order) }}</text></view>
      <view class="item"><text class="label">Fee</text><text>{{ formatMoney(order.service_fee) }}</text></view>
      <view class="item"><text class="label">Note</text><text>{{ order.note || "No note" }}</text></view>

      <view class="timeline">
        <text class="section-title">Timeline</text>
        <view v-for="entry in order.timeline || []" :key="`${entry.to_status}-${entry.created_at}`" class="timeline-row">
          <text>{{ entry.to_status }}</text>
          <text class="muted">{{ entry.created_at }}</text>
        </view>
      </view>

      <button v-if="order.status === 'posted'" class="primary-btn" @click="handleAccept">Accept order</button>
      <button v-else-if="nextStatus" class="primary-btn" @click="handleNextStatus">
        Move to {{ nextStatus }}
      </button>
    </view>
  </view>
</template>

<style scoped>
.page {
  padding: 28rpx;
}

.card {
  background: #ffffff;
  border-radius: 24rpx;
  padding: 28rpx;
  box-shadow: 0 8rpx 24rpx rgba(15, 23, 42, 0.06);
}

.header,
.item,
.timeline-row {
  display: flex;
  justify-content: space-between;
  gap: 24rpx;
  margin-bottom: 18rpx;
}

.order-no,
.section-title {
  font-weight: 700;
}

.label,
.muted {
  color: #6b7280;
}

.timeline {
  margin-top: 28rpx;
}

.primary-btn {
  margin-top: 24rpx;
  border-radius: 999px;
  background: #0f766e;
  color: #ffffff;
}

.empty {
  padding: 48rpx 24rpx;
  text-align: center;
  color: #6b7280;
}
</style>
