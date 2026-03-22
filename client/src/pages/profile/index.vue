<script setup>
import { computed, onMounted } from "vue";
import hubuEmblem from "../../assets/hubu-emblem.jpg";
import { useUserStore } from "../../store/user";
import { ensureLoggedIn } from "../../utils/auth";

const userStore = useUserStore();
const user = computed(() => userStore.currentUser || {});

const profileRows = computed(() => [
  {
    label: "Student ID",
    value: user.value.student_id || "Not set"
  },
  {
    label: "Dorm",
    value: user.value.dorm_building || "Not set"
  },
  {
    label: "Room",
    value:
      user.value.floor_no && user.value.room_no
        ? `${user.value.floor_no}-${user.value.room_no}`
        : "Not set"
  }
]);

onMounted(() => {
  ensureLoggedIn(userStore);
});

function handleLogout() {
  userStore.logout();
  uni.redirectTo({ url: "/pages/auth/login" });
}

function goToMyOrders() {
  uni.navigateTo({ url: "/pages/my-orders/index" });
}

function goToHome() {
  uni.navigateTo({ url: "/pages/home/index" });
}
</script>

<template>
  <view class="page">
    <view class="header-card">
      <view class="brand-row">
        <view class="logo-box">
          <image class="logo" :src="hubuEmblem" mode="aspectFit" />
        </view>

        <view class="brand-copy">
          <text class="eyebrow">Profile</text>
          <text class="title">{{ user.nickname || "Campus user" }}</text>
          <text class="subtitle">Manage your dorm information and check your current account status.</text>
        </view>
      </view>
    </view>

    <view class="stats-grid">
      <view class="stat-card">
        <text class="stat-value">{{ user.credit_score || "5.0" }}</text>
        <text class="stat-label">Credit</text>
      </view>
      <view class="stat-card">
        <text class="stat-value">{{ user.completed_count || 0 }}</text>
        <text class="stat-label">Completed</text>
      </view>
      <view class="stat-card">
        <text class="stat-value">{{ user.dorm_building || "Dorm" }}</text>
        <text class="stat-label">Building</text>
      </view>
    </view>

    <view class="info-card">
      <text class="section-title">Account details</text>

      <view class="detail-row" v-for="item in profileRows" :key="item.label">
        <text class="detail-label">{{ item.label }}</text>
        <text class="detail-value">{{ item.value }}</text>
      </view>
    </view>

    <view class="info-card">
      <text class="section-title">Current status</text>
      <text class="note-copy">
        This profile is ready for posting requests, checking order progress, and joining pickup runs inside the dorm delivery flow.
      </text>

      <view class="action-group">
        <button class="primary-btn" @click="goToMyOrders">View My Orders</button>
        <button class="secondary-btn" @click="goToHome">Back to Hall</button>
        <button class="ghost-btn" @click="handleLogout">Log Out</button>
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

.header-card,
.stat-card,
.info-card {
  border-radius: 30rpx;
  background: rgba(255, 255, 255, 0.96);
  border: 1rpx solid rgba(20, 104, 63, 0.08);
  box-shadow: 0 20rpx 52rpx rgba(24, 56, 38, 0.08);
}

.header-card {
  padding: 28rpx;
  margin-bottom: 18rpx;
}

.brand-row {
  display: flex;
  align-items: center;
  gap: 22rpx;
}

.logo-box {
  width: 116rpx;
  height: 116rpx;
  padding: 8rpx;
  border-radius: 26rpx;
  background: #ffffff;
  box-shadow: inset 0 0 0 1rpx rgba(20, 104, 63, 0.08);
  flex-shrink: 0;
}

.logo {
  width: 100%;
  height: 100%;
}

.brand-copy {
  flex: 1;
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
  margin-bottom: 14rpx;
}

.title {
  display: block;
  font-size: 44rpx;
  font-weight: 800;
  color: #1b2333;
}

.subtitle {
  display: block;
  margin-top: 12rpx;
  font-size: 24rpx;
  line-height: 1.55;
  color: #6c7587;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14rpx;
  margin-bottom: 18rpx;
}

.stat-card {
  padding: 24rpx 18rpx;
  text-align: center;
}

.stat-value {
  display: block;
  font-size: 34rpx;
  font-weight: 800;
  color: #1b2333;
  line-height: 1.2;
}

.stat-label {
  display: block;
  margin-top: 10rpx;
  font-size: 22rpx;
  font-weight: 700;
  color: #6c7587;
}

.info-card {
  padding: 28rpx;
  margin-bottom: 18rpx;
}

.section-title {
  display: block;
  font-size: 30rpx;
  font-weight: 800;
  color: #1b2333;
  margin-bottom: 16rpx;
}

.detail-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20rpx;
  padding: 18rpx 0;
  border-top: 1rpx solid rgba(20, 104, 63, 0.08);
}

.detail-row:first-of-type {
  border-top: 0;
  padding-top: 0;
}

.detail-label {
  font-size: 22rpx;
  font-weight: 700;
  color: #6c7587;
}

.detail-value {
  font-size: 24rpx;
  line-height: 1.45;
  font-weight: 700;
  color: #1b2333;
  text-align: right;
}

.note-copy {
  display: block;
  font-size: 24rpx;
  line-height: 1.6;
  color: #6c7587;
}

.action-group {
  margin-top: 22rpx;
}

.primary-btn,
.secondary-btn,
.ghost-btn {
  height: 86rpx;
  border-radius: 999px;
  font-size: 26rpx;
  font-weight: 800;
  line-height: 86rpx;
}

.primary-btn {
  background: linear-gradient(135deg, #14683f, #2f8f5a);
  color: #ffffff;
  margin-bottom: 14rpx;
}

.secondary-btn {
  background: rgba(47, 143, 90, 0.08);
  color: #14683f;
  margin-bottom: 14rpx;
}

.ghost-btn {
  background: transparent;
  color: #5d6677;
  border: 1rpx solid rgba(20, 104, 63, 0.12);
}
</style>
