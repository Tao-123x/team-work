<script setup>
import { computed, onMounted } from "vue";
import StatusTag from "../../components/status-tag/StatusTag.vue";
import { acceptOrder, updateOrderStatus } from "../../api/orders";
import { useOrderStore } from "../../store/order";
import { useUserStore } from "../../store/user";
import { ensureLoggedIn } from "../../utils/auth";
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

const nextActionLabel = computed(() => {
  if (nextStatus.value === "picked_up") return "Mark as Picked Up";
  if (nextStatus.value === "delivered") return "Mark as Delivered";
  if (nextStatus.value === "completed") return "Confirm Completion";
  return "";
});

onMounted(() => {
  if (!ensureLoggedIn(userStore)) {
    return;
  }
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
    <view v-if="!order" class="empty-card">
      <text class="empty-title">Loading order</text>
      <text class="empty-copy">Fetching order details and status history.</text>
    </view>

    <view v-else class="stack">
      <view class="header-card">
        <view class="top-row">
          <view>
            <text class="eyebrow">Order Detail</text>
            <text class="order-no">{{ order.order_no }}</text>
          </view>
          <StatusTag :status="order.status" />
        </view>

        <view class="route-block">
          <view class="route-row">
            <text class="label">Pickup</text>
            <text class="value">{{ order.pickup_location }}</text>
          </view>
          <view class="route-row">
            <text class="label">Deliver to</text>
            <text class="value">{{ formatDormAddress(order) }}</text>
          </view>
        </view>
      </view>

      <view class="card">
        <text class="section-title">Order Summary</text>

        <view class="summary-grid">
          <view class="summary-item">
            <text class="meta-label">Fee</text>
            <text class="meta-value">{{ formatMoney(order.service_fee) }}</text>
          </view>
          <view class="summary-item">
            <text class="meta-label">Requester</text>
            <text class="meta-value small">{{ order.requester?.nickname || "Unknown" }}</text>
          </view>
          <view class="summary-item">
            <text class="meta-label">Helper</text>
            <text class="meta-value small">{{ order.helper?.nickname || "Waiting" }}</text>
          </view>
          <view class="summary-item">
            <text class="meta-label">Note</text>
            <text class="meta-value small">{{ order.note || "No extra note" }}</text>
          </view>
        </view>
      </view>

      <view class="card">
        <text class="section-title">Timeline</text>

        <view
          v-for="entry in order.timeline || []"
          :key="`${entry.to_status}-${entry.created_at}`"
          class="timeline-item"
        >
          <view class="timeline-dot" />
          <view class="timeline-content">
            <text class="timeline-status">{{ entry.to_status }}</text>
            <text class="timeline-note">{{ entry.action_note || "Status updated" }}</text>
            <text class="timeline-time">{{ entry.created_at }}</text>
          </view>
        </view>
      </view>

      <view class="card">
        <text class="section-title">Actions</text>

        <button v-if="order.status === 'posted'" class="primary-btn" @click="handleAccept">
          Accept Order
        </button>
        <button v-else-if="nextStatus" class="primary-btn" @click="handleNextStatus">
          {{ nextActionLabel }}
        </button>
        <view v-else class="done-box">
          <text class="done-title">No further action</text>
          <text class="done-copy">This order is already in its final state.</text>
        </view>
      </view>
    </view>
  </view>
</template>

<style scoped>
.page {
  min-height: 100vh;
  padding: 28rpx 22rpx 40rpx;
  background:
    radial-gradient(circle at top left, rgba(47, 143, 90, 0.08), transparent 26%),
    linear-gradient(180deg, #f5f8f4, #eef5ef);
}

.stack {
  display: flex;
  flex-direction: column;
  gap: 18rpx;
}

.header-card,
.card,
.empty-card {
  border-radius: 30rpx;
  background: rgba(255, 255, 255, 0.96);
  border: 1rpx solid rgba(20, 104, 63, 0.08);
  box-shadow: 0 20rpx 52rpx rgba(24, 56, 38, 0.08);
}

.header-card,
.card,
.empty-card {
  padding: 28rpx;
}

.top-row,
.route-row {
  display: flex;
  justify-content: space-between;
  gap: 18rpx;
}

.top-row {
  align-items: flex-start;
  margin-bottom: 18rpx;
}

.eyebrow {
  display: inline-flex;
  padding: 8rpx 16rpx;
  border-radius: 999px;
  background: rgba(47, 143, 90, 0.08);
  color: #14683f;
  font-size: 18rpx;
  font-weight: 800;
  letter-spacing: 1.6rpx;
  text-transform: uppercase;
  margin-bottom: 10rpx;
}

.order-no {
  display: block;
  font-size: 34rpx;
  font-weight: 800;
  color: #1b2333;
}

.route-block {
  padding: 18rpx 20rpx;
  border-radius: 18rpx;
  background: #f6f7f4;
}

.route-row + .route-row {
  margin-top: 14rpx;
}

.label {
  font-size: 20rpx;
  font-weight: 700;
  color: #657183;
}

.value {
  flex: 1;
  text-align: right;
  font-size: 24rpx;
  line-height: 1.45;
  font-weight: 700;
  color: #1b2333;
}

.section-title {
  display: block;
  font-size: 32rpx;
  font-weight: 800;
  color: #1b2333;
  margin-bottom: 18rpx;
}

.summary-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14rpx;
}

.summary-item {
  padding: 18rpx;
  border-radius: 18rpx;
  background: #f6f7f4;
}

.meta-label {
  display: block;
  font-size: 18rpx;
  font-weight: 700;
  color: #6c7587;
  margin-bottom: 8rpx;
}

.meta-value {
  display: block;
  font-size: 26rpx;
  font-weight: 800;
  color: #14683f;
}

.meta-value.small {
  font-size: 22rpx;
  line-height: 1.45;
  color: #1b2333;
}

.timeline-item {
  display: flex;
  gap: 14rpx;
}

.timeline-item + .timeline-item {
  margin-top: 14rpx;
}

.timeline-dot {
  width: 16rpx;
  height: 16rpx;
  margin-top: 12rpx;
  border-radius: 999px;
  background: #2f8f5a;
  flex-shrink: 0;
}

.timeline-content {
  flex: 1;
  padding: 18rpx;
  border-radius: 18rpx;
  background: #f6f7f4;
}

.timeline-status {
  display: block;
  font-size: 24rpx;
  font-weight: 800;
  color: #1b2333;
}

.timeline-note,
.timeline-time,
.done-copy,
.empty-copy {
  display: block;
  margin-top: 8rpx;
  font-size: 22rpx;
  line-height: 1.5;
  color: #6c7587;
}

.primary-btn {
  height: 88rpx;
  border-radius: 999px;
  background: linear-gradient(135deg, #14683f, #2f8f5a);
  color: #ffffff;
  font-size: 27rpx;
  font-weight: 800;
}

.done-box {
  padding: 18rpx 20rpx;
  border-radius: 18rpx;
  background: #f6f7f4;
}

.done-title,
.empty-title {
  display: block;
  font-size: 28rpx;
  font-weight: 800;
  color: #1b2333;
}
</style>
