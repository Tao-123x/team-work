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
  if (props.status === "completed") return "done";
  if (props.status === "cancelled") return "cancelled";
  if (props.status === "accepted" || props.status === "picked_up") return "active";
  return "default";
});
</script>

<template>
  <view class="status-tag" :class="colorClass">{{ formatStatus(status) }}</view>
</template>

<style scoped>
.status-tag {
  display: inline-flex;
  padding: 8rpx 18rpx;
  border-radius: 999px;
  font-size: 24rpx;
  font-weight: 600;
}

.default {
  background: #eef2ff;
  color: #4338ca;
}

.active {
  background: #ecfdf5;
  color: #047857;
}

.done {
  background: #eff6ff;
  color: #1d4ed8;
}

.cancelled {
  background: #fef2f2;
  color: #b91c1c;
}
</style>
