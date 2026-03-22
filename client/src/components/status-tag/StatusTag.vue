<script setup>
import { computed } from "vue";
import { formatStatus } from "../../utils/format";

const props = defineProps({
  status: {
    type: String,
    default: "posted"
  }
});

const colorClass = computed(() => {
  if (props.status === "completed") return "status--done";
  if (props.status === "cancelled") return "status--cancelled";
  if (props.status === "accepted") return "status--accepted";
  if (props.status === "picked_up") return "status--picked";
  if (props.status === "delivered") return "status--delivered";
  return "status--posted";
});
</script>

<template>
  <view class="status-tag" :class="colorClass">
    <view class="dot" />
    <text>{{ formatStatus(status) }}</text>
  </view>
</template>

<style scoped>
.status-tag {
  display: inline-flex;
  align-items: center;
  gap: 10rpx;
  padding: 10rpx 16rpx;
  border-radius: 999px;
  font-size: 22rpx;
  font-weight: 700;
  border: 1rpx solid transparent;
}

.dot {
  width: 10rpx;
  height: 10rpx;
  border-radius: 999px;
  background: currentColor;
}

.status--posted {
  background: rgba(20, 104, 63, 0.08);
  color: #14683f;
  border-color: rgba(20, 104, 63, 0.12);
}

.status--accepted {
  background: rgba(47, 143, 90, 0.12);
  color: #1f7f51;
  border-color: rgba(47, 143, 90, 0.16);
}

.status--picked {
  background: rgba(106, 166, 128, 0.14);
  color: #46795a;
  border-color: rgba(106, 166, 128, 0.16);
}

.status--delivered {
  background: rgba(94, 121, 103, 0.12);
  color: #54695b;
  border-color: rgba(94, 121, 103, 0.14);
}

.status--done {
  background: rgba(27, 35, 51, 0.08);
  color: #283242;
  border-color: rgba(27, 35, 51, 0.1);
}

.status--cancelled {
  background: rgba(177, 82, 74, 0.1);
  color: #a14b45;
  border-color: rgba(177, 82, 74, 0.14);
}
</style>
