<script setup>
import { computed, onMounted, ref } from "vue";
import OrderCard from "../../components/order-card/OrderCard.vue";
import { useOrderStore } from "../../store/order";
import { useUserStore } from "../../store/user";
import { ensureLoggedIn } from "../../utils/auth";

const orderStore = useOrderStore();
const userStore = useUserStore();
const activeTab = ref("requester");

const visibleOrders = computed(() =>
  activeTab.value === "requester" ? orderStore.myRequests : orderStore.myAcceptedOrders
);

onMounted(() => {
  if (!ensureLoggedIn(userStore)) {
    return;
  }
  orderStore.loadMyOrders(userStore.currentUser.user_id);
});

function goToDetail(order) {
  uni.navigateTo({
    url: `/pages/order-detail/index?id=${order.id}`
  });
}
</script>

<template>
  <view class="page">
    <view class="header-card">
      <text class="eyebrow">My Orders</text>
      <text class="title">Your activity</text>
      <text class="subtitle">Check the requests you posted and the orders you accepted.</text>
    </view>

    <view class="tabs-shell">
      <view class="tabs">
        <view class="tab" :class="{ active: activeTab === 'requester' }" @click="activeTab = 'requester'">
          My Requests
        </view>
        <view class="tab" :class="{ active: activeTab === 'helper' }" @click="activeTab = 'helper'">
          Accepted
        </view>
      </view>
    </view>

    <view v-if="orderStore.loading" class="empty-card">
      <text class="empty-title">Loading activity</text>
      <text class="empty-copy">Fetching your request and delivery history.</text>
    </view>
    <view v-else-if="!visibleOrders.length" class="empty-card">
      <text class="empty-title">No orders yet</text>
      <text class="empty-copy">Create a request or accept one from the order hall.</text>
    </view>

    <OrderCard
      v-for="order in visibleOrders"
      :key="order.id"
      :order="order"
      @click="goToDetail"
    />
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
.tabs-shell,
.empty-card {
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

.tabs-shell {
  padding: 8rpx;
  margin-bottom: 18rpx;
}

.tabs {
  display: flex;
  gap: 8rpx;
}

.tab {
  flex: 1;
  text-align: center;
  padding: 18rpx 12rpx;
  border-radius: 999px;
  color: #5c687b;
  font-size: 24rpx;
  font-weight: 700;
}

.active {
  background: linear-gradient(135deg, #14683f, #2f8f5a);
  color: #ffffff;
}

.empty-card {
  padding: 30rpx;
}

.empty-title {
  display: block;
  font-size: 30rpx;
  font-weight: 800;
  color: #1b2333;
}

.empty-copy {
  display: block;
  margin-top: 10rpx;
  font-size: 23rpx;
  color: #6c7587;
}
</style>
