<script setup>
import { computed } from "vue";
import { formatDeadlineTime, formatDormAddress, formatMoney, formatStatus, isUrgentDeadline } from "../../utils/format";

const props = defineProps({
  order: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(["click"]);

const requesterName = computed(
  () => props.order.requester?.nickname || props.order.requester_nickname || "Campus peer"
);

const urgent = computed(() => isUrgentDeadline(props.order.deadline_at));

const stateLabel = computed(() => {
  if (urgent.value) {
    return "Urgent";
  }

  return formatStatus(props.order.status);
});
</script>

<template>
  <view class="card" :class="{ 'card--urgent': urgent }" @click="emit('click', order)">
    <view class="top-row">
      <view class="pickup-block">
        <text class="meta-label">Pickup</text>
        <text class="pickup-value">{{ order.pickup_location }}</text>
      </view>

      <view class="price-block">
        <text class="state-pill" :class="{ 'state-pill--urgent': urgent }">{{ stateLabel }}</text>
        <text class="price-value">{{ formatMoney(order.service_fee) }}</text>
      </view>
    </view>

    <view class="route-shell">
      <text class="meta-label">Deliver to</text>
      <text class="route-value">{{ formatDormAddress(order) }}</text>
    </view>

    <view class="bottom-row">
      <text class="supporting">{{ formatDeadlineTime(order.deadline_at) }}</text>
      <text class="supporting">by {{ requesterName }}</text>
    </view>
  </view>
</template>

<style scoped>
.card {
  background: rgba(255, 255, 255, 0.98);
  border-radius: 26rpx;
  padding: 24rpx;
  margin-bottom: 18rpx;
  border: 1rpx solid rgba(20, 104, 63, 0.08);
  box-shadow: 0 14rpx 34rpx rgba(24, 56, 38, 0.06);
}

.card--urgent {
  border-color: rgba(185, 122, 47, 0.18);
  box-shadow: 0 16rpx 36rpx rgba(168, 113, 48, 0.08);
}

.top-row,
.bottom-row {
  display: flex;
  justify-content: space-between;
  gap: 20rpx;
}

.top-row {
  align-items: flex-start;
}

.pickup-block {
  flex: 1;
}

.price-block {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 12rpx;
}

.meta-label {
  display: block;
  font-size: 18rpx;
  font-weight: 700;
  letter-spacing: 1.2rpx;
  text-transform: uppercase;
  color: #7a8698;
}

.pickup-value,
.route-value {
  display: block;
  margin-top: 10rpx;
  font-size: 28rpx;
  line-height: 1.4;
  font-weight: 800;
  color: #1b2333;
}

.state-pill {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 104rpx;
  padding: 10rpx 16rpx;
  border-radius: 999px;
  background: rgba(20, 104, 63, 0.08);
  color: #14683f;
  font-size: 20rpx;
  font-weight: 800;
}

.state-pill--urgent {
  background: rgba(210, 151, 75, 0.12);
  color: #9b6321;
}

.price-value {
  font-size: 34rpx;
  line-height: 1;
  font-weight: 800;
  color: #14683f;
}

.route-shell {
  margin-top: 20rpx;
  padding: 18rpx 20rpx;
  border-radius: 20rpx;
  background: #f6f8f4;
}

.bottom-row {
  margin-top: 18rpx;
  align-items: center;
}

.supporting {
  font-size: 22rpx;
  color: #6c7587;
  line-height: 1.45;
}
</style>
