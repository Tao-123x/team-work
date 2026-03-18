<script setup>
import { reactive } from "vue";
import { createOrder } from "../../api/orders";
import { useUserStore } from "../../store/user";
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
  uni.switchTab({ url: "/pages/home/index" });
}
</script>

<template>
  <view class="page">
    <view class="card">
      <view class="field">
        <text class="label">Pickup location</text>
        <input v-model="form.pickup_location" class="input" />
      </view>
      <view class="field">
        <text class="label">Dorm building</text>
        <input v-model="form.dorm_building" class="input" />
      </view>
      <view class="field two-col">
        <view class="half">
          <text class="label">Floor</text>
          <input v-model="form.floor_no" class="input" />
        </view>
        <view class="half">
          <text class="label">Room</text>
          <input v-model="form.room_no" class="input" />
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
        <textarea v-model="form.note" class="textarea" placeholder="Extra details for the helper" />
      </view>
      <button class="submit-btn" @click="handleSubmit">Create request</button>
    </view>
  </view>
</template>

<style scoped>
.page {
  padding: 28rpx;
}

.card {
  background: #ffffff;
  border-radius: 24rpx;
  padding: 28rpx;
  box-shadow: 0 8rpx 24rpx rgba(15, 23, 42, 0.06);
}

.field {
  margin-bottom: 22rpx;
}

.two-col {
  display: flex;
  gap: 16rpx;
}

.half {
  flex: 1;
}

.label {
  display: block;
  margin-bottom: 12rpx;
  font-size: 24rpx;
  color: #4b5563;
}

.input,
.textarea {
  width: 100%;
  border-radius: 16rpx;
  background: #f8fafc;
  padding: 20rpx;
  font-size: 28rpx;
}

.textarea {
  min-height: 160rpx;
}

.submit-btn {
  margin-top: 12rpx;
  border-radius: 999px;
  background: #1d4ed8;
  color: #ffffff;
}
</style>
