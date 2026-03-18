<script setup>
import { computed } from "vue";
import { useUserStore } from "../../store/user";

const userStore = useUserStore();
const user = computed(() => userStore.currentUser);
</script>

<template>
  <view class="page">
    <view class="card">
      <text class="name">{{ user.nickname }}</text>
      <text class="subline">Student ID: {{ user.student_id }}</text>
      <text class="subline">
        Dorm: {{ user.dorm_building }} {{ user.floor_no }}-{{ user.room_no }}
      </text>
    </view>

    <view class="stats">
      <view class="stat-card">
        <text class="stat-value">5.0</text>
        <text class="stat-label">Credit</text>
      </view>
      <view class="stat-card">
        <text class="stat-value">0</text>
        <text class="stat-label">Completed</text>
      </view>
      <view class="stat-card">
        <text class="stat-value">0</text>
        <text class="stat-label">Reviews</text>
      </view>
    </view>
  </view>
</template>

<style scoped>
.page {
  padding: 28rpx;
}

.card {
  background: linear-gradient(135deg, #111827, #1d4ed8);
  color: #ffffff;
  border-radius: 28rpx;
  padding: 32rpx;
  margin-bottom: 24rpx;
}

.name {
  display: block;
  font-size: 40rpx;
  font-weight: 700;
  margin-bottom: 12rpx;
}

.subline {
  display: block;
  font-size: 26rpx;
  margin-bottom: 8rpx;
}

.stats {
  display: flex;
  gap: 16rpx;
}

.stat-card {
  flex: 1;
  background: #ffffff;
  border-radius: 24rpx;
  padding: 24rpx;
  text-align: center;
  box-shadow: 0 8rpx 24rpx rgba(15, 23, 42, 0.06);
}

.stat-value {
  display: block;
  font-size: 38rpx;
  font-weight: 700;
  margin-bottom: 8rpx;
}

.stat-label {
  color: #6b7280;
  font-size: 24rpx;
}
</style>
