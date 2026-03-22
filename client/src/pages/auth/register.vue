<script setup>
import { computed, reactive } from "vue";
import hubuEmblem from "../../assets/hubu-emblem.jpg";
import { useUserStore } from "../../store/user";

const userStore = useUserStore();

const form = reactive({
  student_id: "",
  nickname: "",
  dorm_building: "",
  floor_no: "",
  room_no: ""
});

const submitLabel = computed(() => (userStore.loading ? "Creating..." : "Create Account"));

if (userStore.isLoggedIn) {
  uni.redirectTo({ url: "/pages/home/index" });
}

async function handleRegister() {
  const requiredFields = ["student_id", "nickname", "dorm_building", "floor_no", "room_no"];
  const missingField = requiredFields.find((field) => !form[field]);

  if (missingField) {
    uni.showToast({ title: `${missingField} is required`, icon: "none" });
    return;
  }

  try {
    await userStore.registerWithProfile({ ...form });
    uni.redirectTo({ url: "/pages/home/index" });
  } catch (error) {
    uni.showToast({ title: error?.message || "Register failed", icon: "none" });
  }
}

function goToLogin() {
  uni.navigateTo({ url: "/pages/auth/login" });
}
</script>

<template>
  <view class="page">
    <view class="brand-panel">
      <view class="brand-row">
        <view class="logo-box">
          <image class="logo" :src="hubuEmblem" mode="aspectFit" />
        </view>

        <view class="brand-copy">
          <text class="school-name">Hubei University</text>
          <text class="product-name">New Account</text>
          <text class="product-note">Fill in your student and dorm details to enter the demo platform.</text>
        </view>
      </view>
    </view>

    <view class="form-panel">
      <view class="form-head">
        <text class="form-title">Register</text>
        <text class="form-note">Please use a realistic student and dorm format</text>
      </view>

      <view class="field">
        <text class="label">Student ID</text>
        <input v-model="form.student_id" class="input" placeholder="2026xxxx" />
      </view>
      <view class="field">
        <text class="label">Nickname</text>
        <input v-model="form.nickname" class="input" placeholder="Enter your nickname" />
      </view>
      <view class="field">
        <text class="label">Dorm Building</text>
        <input v-model="form.dorm_building" class="input" placeholder="Dorm A / Dorm B" />
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

      <button class="primary-btn" @click="handleRegister">{{ submitLabel }}</button>

      <view class="switch-row">
        <text class="switch-copy">Already have an account?</text>
        <text class="switch-link" @click="goToLogin">Back to sign in</text>
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

.brand-panel,
.form-panel {
  border-radius: 30rpx;
  background: rgba(255, 255, 255, 0.96);
  border: 1rpx solid rgba(20, 104, 63, 0.08);
  box-shadow: 0 20rpx 52rpx rgba(24, 56, 38, 0.08);
}

.brand-panel {
  padding: 28rpx;
  margin-bottom: 18rpx;
}

.brand-row {
  display: flex;
  align-items: center;
  gap: 20rpx;
}

.logo-box {
  width: 116rpx;
  height: 116rpx;
  padding: 10rpx;
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

.school-name {
  display: block;
  font-size: 28rpx;
  font-weight: 800;
  color: #14683f;
  margin-bottom: 8rpx;
}

.product-name {
  display: block;
  font-size: 42rpx;
  font-weight: 800;
  color: #1b2333;
}

.product-note {
  display: block;
  margin-top: 12rpx;
  font-size: 23rpx;
  line-height: 1.5;
  color: #6c7587;
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
</style>
