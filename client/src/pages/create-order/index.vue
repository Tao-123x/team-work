<script setup>
import { onMounted, reactive } from "vue";
import { createOrder } from "../../api/orders";
import { useUserStore } from "../../store/user";
import { ensureLoggedIn } from "../../utils/auth";
import { validateCreateOrder } from "../../utils/validators";

const userStore = useUserStore();

const form = reactive({
  pickup_location: "Dorm A takeaway shelf",
  dorm_building: userStore.currentUser.dorm_building,
  floor_no: userStore.currentUser.floor_no,
  room_no: userStore.currentUser.room_no,
  takeaway_type: "",
  note: "",
  service_fee: 2,
  deadline_at: ""
});

onMounted(() => {
  ensureLoggedIn(userStore);
});

async function handleSubmit() {
  const message = validateCreateOrder(form);
  if (message) {
    uni.showToast({ title: message, icon: "none" });
    return;
  }

  await createOrder({
    requester_id: userStore.currentUser.user_id,
    ...form
  });

  uni.showToast({ title: "Order created", icon: "success" });
  uni.redirectTo({ url: "/pages/home/index" });
}
</script>

<template>
  <view class="page">
    <view class="header-card">
      <text class="eyebrow">New Request</text>
      <text class="title">Create a pickup request</text>
      <text class="subtitle">Add the pickup point, dorm room, fee, and any note for the helper.</text>
    </view>

    <view class="form-card">
      <view class="field">
        <text class="label">Pickup location</text>
        <input v-model="form.pickup_location" class="input" placeholder="Dorm shelf / gate pickup spot" />
      </view>
      <view class="field">
        <text class="label">Dorm building</text>
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

      <view class="field">
        <text class="label">Takeaway type</text>
        <input v-model="form.takeaway_type" class="input" placeholder="Milk tea / meal / fruit" />
      </view>
      <view class="field">
        <text class="label">Service fee</text>
        <input v-model="form.service_fee" class="input" type="number" />
      </view>
      <view class="field">
        <text class="label">Deadline</text>
        <input v-model="form.deadline_at" class="input" placeholder="2026-03-11 18:30:00" />
      </view>
      <view class="field">
        <text class="label">Note</text>
        <textarea
          v-model="form.note"
          class="textarea"
          placeholder="Bag color, pickup code reminder, or anything the helper should know"
        />
      </view>

      <button class="primary-btn" @click="handleSubmit">Create Request</button>
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
.form-card {
  border-radius: 30rpx;
  background: rgba(255, 255, 255, 0.96);
  border: 1rpx solid rgba(20, 104, 63, 0.08);
  box-shadow: 0 20rpx 52rpx rgba(24, 56, 38, 0.08);
}

.header-card {
  padding: 28rpx;
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
  margin-bottom: 16rpx;
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

.form-card {
  padding: 28rpx;
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

.input,
.textarea {
  width: 100%;
  border-radius: 18rpx;
  background: #f6f7f4;
  border: 1rpx solid rgba(27, 35, 51, 0.06);
  padding: 0 22rpx;
  font-size: 27rpx;
}

.input {
  height: 88rpx;
}

.textarea {
  min-height: 170rpx;
  padding-top: 22rpx;
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
</style>
