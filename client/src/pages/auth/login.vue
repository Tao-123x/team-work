<script setup>
import { computed, reactive } from "vue";
import hubuEmblem from "../../assets/hubu-emblem.jpg";
import { useUserStore } from "../../store/user";

const userStore = useUserStore();

const form = reactive({
  student_id: "20260001",
  nickname: "Demo User",
  dorm_building: "Dorm A",
  floor_no: "6",
  room_no: "602"
});

const submitLabel = computed(() => (userStore.loading ? "Signing in..." : "Enter"));

if (userStore.isLoggedIn) {
  uni.redirectTo({ url: "/pages/home/index" });
}

async function handleLogin() {
  const requiredFields = ["student_id", "nickname", "dorm_building", "floor_no", "room_no"];
  const missingField = requiredFields.find((field) => !form[field]);

  if (missingField) {
    uni.showToast({ title: `${missingField} is required`, icon: "none" });
    return;
  }

  try {
    await userStore.loginWithProfile({ ...form });
    uni.redirectTo({ url: "/pages/home/index" });
  } catch (error) {
    uni.showToast({ title: error?.message || "Login failed", icon: "none" });
  }
}

function goToRegister() {
  uni.navigateTo({ url: "/pages/auth/register" });
}
</script>

<template>
  <view class="page">
    <view class="brand-panel">
      <view class="brand-top">
        <view class="logo-box">
          <image class="logo" :src="hubuEmblem" mode="aspectFit" />
        </view>

        <view class="brand-copy">
          <text class="school-name">Hubei University</text>
          <text class="product-name">Dorm Takeaway Relay</text>
          <text class="product-note">A dorm-based campus pickup and delivery demo platform</text>
        </view>
      </view>

      <view class="tip-strip">
        <text class="tip-title">Demo note</text>
        <text class="tip-copy">This page is prefilled with the seeded demo account. Click Enter to open the full flow.</text>
      </view>
    </view>

    <view class="form-panel">
      <view class="form-head">
        <text class="form-title">Sign In</text>
        <text class="form-note">Please fill in your student and dorm information</text>
      </view>

      <view class="field">
        <text class="label">Student ID</text>
        <input v-model="form.student_id" class="input" placeholder="20260001" />
      </view>
      <view class="field">
        <text class="label">Nickname</text>
        <input v-model="form.nickname" class="input" placeholder="Enter your nickname" />
      </view>
      <view class="field">
        <text class="label">Dorm Building</text>
        <input v-model="form.dorm_building" class="input" placeholder="Dorm A" />
      </view>

      <view class="grid-row">
        <view class="field half">
          <text class="label">Floor</text>
          <input v-model="form.floor_no" class="input" placeholder="6" />
        </view>
        <view class="field half">
          <text class="label">Room</text>
          <input v-model="form.room_no" class="input" placeholder="602" />
        </view>
      </view>

      <button class="primary-btn" @click="handleLogin">{{ submitLabel }}</button>

      <view class="switch-row">
        <text class="switch-copy">Don't have an account yet?</text>
        <text class="switch-link" @click="goToRegister">Register</text>
      </view>
    </view>

    <view v-if="userStore.loading" class="loading-overlay">
      <view class="loading-card">
        <image class="loading-logo" :src="hubuEmblem" mode="aspectFit" />
        <text class="loading-title">Entering the platform</text>
        <text class="loading-copy">Loading the order hall and your profile...</text>
        <view class="loading-line">
          <view class="loading-line-bar" />
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
    radial-gradient(circle at top left, rgba(47, 143, 90, 0.1), transparent 26%),
    linear-gradient(180deg, #f4f8f3, #eef6ef);
}

.brand-panel,
.form-panel,
.loading-card {
  border-radius: 30rpx;
  background: rgba(255, 255, 255, 0.96);
  border: 1rpx solid rgba(20, 104, 63, 0.08);
  box-shadow: 0 20rpx 52rpx rgba(24, 56, 38, 0.08);
}

.brand-panel {
  padding: 30rpx;
  margin-bottom: 18rpx;
}

.brand-top {
  display: flex;
  gap: 22rpx;
  align-items: center;
}

.logo-box {
  width: 132rpx;
  height: 132rpx;
  padding: 10rpx;
  border-radius: 28rpx;
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

.school-name {
  display: block;
  font-size: 30rpx;
  font-weight: 800;
  color: #14683f;
  margin-bottom: 10rpx;
}

.product-name {
  display: block;
  font-size: 48rpx;
  line-height: 1.08;
  font-weight: 800;
  color: #1b2333;
}

.product-note {
  display: block;
  margin-top: 14rpx;
  font-size: 24rpx;
  line-height: 1.55;
  color: #6c7587;
}

.tip-strip {
  margin-top: 24rpx;
  padding: 20rpx 22rpx;
  border-radius: 22rpx;
  background: rgba(47, 143, 90, 0.08);
}

.tip-title {
  display: block;
  font-size: 20rpx;
  font-weight: 800;
  color: #14683f;
  margin-bottom: 8rpx;
}

.tip-copy {
  display: block;
  font-size: 23rpx;
  line-height: 1.5;
  color: #4d5d69;
}

.form-panel {
  padding: 28rpx;
}

.form-head {
  margin-bottom: 20rpx;
}

.form-title {
  display: block;
  font-size: 38rpx;
  font-weight: 800;
  color: #1b2333;
}

.form-note {
  display: block;
  margin-top: 10rpx;
  font-size: 24rpx;
  color: #6c7587;
}

.field {
  margin-bottom: 16rpx;
}

.grid-row {
  display: flex;
  gap: 14rpx;
}

.half {
  flex: 1;
}

.label {
  display: block;
  margin-bottom: 10rpx;
  font-size: 20rpx;
  font-weight: 700;
  color: #4f5f6d;
}

.input {
  width: 100%;
  height: 88rpx;
  padding: 0 22rpx;
  border-radius: 18rpx;
  background: #f6f7f4;
  border: 1rpx solid rgba(27, 35, 51, 0.06);
  font-size: 27rpx;
}

.primary-btn {
  margin-top: 12rpx;
  height: 88rpx;
  border-radius: 999px;
  background: linear-gradient(135deg, #14683f, #2f8f5a);
  color: #ffffff;
  font-size: 28rpx;
  font-weight: 800;
}

.switch-row {
  display: flex;
  justify-content: center;
  gap: 10rpx;
  margin-top: 22rpx;
}

.switch-copy {
  font-size: 23rpx;
  color: #6c7587;
}

.switch-link {
  font-size: 23rpx;
  font-weight: 800;
  color: #14683f;
}

.loading-overlay {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24rpx;
  background: rgba(13, 29, 20, 0.24);
  backdrop-filter: blur(8rpx);
}

.loading-card {
  width: 100%;
  max-width: 520rpx;
  padding: 34rpx 28rpx 30rpx;
  text-align: center;
}

.loading-logo {
  width: 104rpx;
  height: 104rpx;
  margin-bottom: 18rpx;
}

.loading-title {
  display: block;
  font-size: 30rpx;
  font-weight: 800;
  color: #1b2333;
}

.loading-copy {
  display: block;
  margin-top: 10rpx;
  font-size: 24rpx;
  color: #6c7587;
}

.loading-line {
  height: 8rpx;
  margin-top: 20rpx;
  border-radius: 999px;
  background: rgba(20, 104, 63, 0.08);
  overflow: hidden;
}

.loading-line-bar {
  width: 38%;
  height: 100%;
  border-radius: 999px;
  background: linear-gradient(90deg, #2f8f5a, #7dcb98);
  animation: loading 1.7s ease-in-out infinite;
}

@keyframes loading {
  0% {
    transform: translateX(-110%);
  }

  100% {
    transform: translateX(260%);
  }
}
</style>
