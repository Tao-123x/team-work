<script setup>
import { computed, onMounted, ref } from "vue";
import OrderCard from "../../components/order-card/OrderCard.vue";
import { useOrderStore } from "../../store/order";
import { useUserStore } from "../../store/user";

const orderStore = useOrderStore();
const userStore = useUserStore();
const activeTab = ref("requester");

const visibleOrders = computed(() =>
  activeTab.value === "requester" ? orderStore.myRequests : orderStore.myAcceptedOrders
);

onMounted(() => {
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
    <view class="tabs">
      <view
        class="tab"
        :class="{ active: activeTab === 'requester' }"
        @click="activeTab = 'requester'"
      >
        My Requests
      </view>
      <view class="tab" :class="{ active: activeTab === 'helper' }" @click="activeTab = 'helper'">
        My Accepted
      </view>
    </view>

    <view v-if="orderStore.loading" class="empty">Loading orders...</view>
    <view v-else-if="!visibleOrders.length" class="empty">No orders found.</view>
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
  padding: 28rpx;
}

.tabs {
  display: flex;
  background: #e5e7eb;
  border-radius: 999px;
  padding: 8rpx;
  margin-bottom: 24rpx;
}

.tab {
  flex: 1;
  text-align: center;
  padding: 16rpx 12rpx;
  border-radius: 999px;
  color: #6b7280;
}

.active {
  background: #ffffff;
  color: #111827;
  font-weight: 700;
}

.empty {
  padding: 48rpx 24rpx;
  text-align: center;
  color: #6b7280;
}
</style>
