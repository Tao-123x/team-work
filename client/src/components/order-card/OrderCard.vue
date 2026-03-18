<script setup>
import StatusTag from "../status-tag/StatusTag.vue";
import { formatDormAddress, formatMoney } from "../../utils/format";

defineProps({
  order: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(["click"]);
</script>

<template>
  <view class="card" @click="emit('click', order)">
    <view class="row top-row">
      <text class="order-no">{{ order.order_no }}</text>
      <StatusTag :status="order.status" />
    </view>
    <view class="row">
      <text class="label">Pickup</text>
      <text class="value">{{ order.pickup_location }}</text>
    </view>
    <view class="row">
      <text class="label">Deliver to</text>
      <text class="value">{{ formatDormAddress(order) }}</text>
    </view>
    <view class="row bottom-row">
      <text class="fee">{{ formatMoney(order.service_fee) }}</text>
      <text class="deadline">{{ order.deadline_at || "No deadline" }}</text>
    </view>
  </view>
</template>

<style scoped>
.card {
  background: #ffffff;
  border-radius: 24rpx;
  padding: 28rpx;
  margin-bottom: 20rpx;
  box-shadow: 0 8rpx 24rpx rgba(15, 23, 42, 0.06);
}

.row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 24rpx;
  margin-bottom: 14rpx;
}

.top-row {
  margin-bottom: 20rpx;
}

.bottom-row {
  margin-bottom: 0;
  padding-top: 12rpx;
}

.order-no,
.fee {
  font-weight: 700;
}

.label,
.deadline {
  color: #6b7280;
  font-size: 24rpx;
}

.value {
  flex: 1;
  text-align: right;
  color: #111827;
  font-size: 26rpx;
}

.fee {
  color: #0f766e;
}
</style>
