<script setup>
import { onMounted } from "vue";
import OrderCard from "../../components/order-card/OrderCard.vue";
import { useOrderStore } from "../../store/order";

const orderStore = useOrderStore();

onMounted(() => {
  orderStore.loadHallOrders({ status: "posted" });
});

function goToDetail(order) {
  uni.navigateTo({
    url: `/pages/order-detail/index?id=${order.id}`
  });
}
</script>

<template>
  <view class="page">
    <view class="hero">
      <text class="title">Dorm order hall</text>
      <text class="subtitle">Pick up takeaway from the shelf and deliver it upstairs.</text>
    </view>

    <view v-if="orderStore.loading" class="empty">Loading orders...</view>
    <view v-else-if="!orderStore.hallOrders.length" class="empty">No open orders right now.</view>
    <OrderCard
      v-for="order in orderStore.hallOrders"
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

.hero {
  background: linear-gradient(135deg, #0f766e, #1d4ed8);
  padding: 32rpx;
  border-radius: 28rpx;
  color: #ffffff;
  margin-bottom: 24rpx;
}

.title {
  display: block;
  font-size: 40rpx;
  font-weight: 700;
  margin-bottom: 10rpx;
}

.subtitle {
  font-size: 26rpx;
  line-height: 1.5;
}

.empty {
  padding: 48rpx 24rpx;
  text-align: center;
  color: #6b7280;
}
</style>
