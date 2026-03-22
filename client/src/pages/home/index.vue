<script setup>
import { computed, onMounted, ref } from "vue";
import hubuEmblem from "../../assets/hubu-emblem.jpg";
import OrderCard from "../../components/order-card/OrderCard.vue";
import { useOrderStore } from "../../store/order";
import { useUserStore } from "../../store/user";
import { ensureLoggedIn } from "../../utils/auth";
import { isUrgentDeadline } from "../../utils/format";

const orderStore = useOrderStore();
const userStore = useUserStore();

const promoIndex = ref(0);
const activeFilter = ref("all");
const showActionSheet = ref(false);

const promoBanners = [
  {
    title: "Longjiang Braised Pork Rice",
    copy: "Popular lunch choice from the takeaway shelf today.",
    cta: "Order with classmates"
  },
  {
    title: "Spicy Beef Noodles",
    copy: "Warm, quick, and easy to bring back before evening study.",
    cta: "See nearby requests"
  },
  {
    title: "Fresh Fruit Tea Combo",
    copy: "A light pick for late afternoon pickup runs.",
    cta: "Join a shared order"
  }
];

const filterItems = [
  { key: "all", label: "All" },
  { key: "near", label: "Near Me" },
  { key: "urgent", label: "Urgent" }
];

const user = computed(() => userStore.currentUser || {});
const apartmentLabel = computed(() => user.value.dorm_building || "No. 3 Apartment");
const pointsLabel = computed(() => {
  const score = Number(user.value.credit_score || 5);
  const completed = Number(user.value.completed_count || 0);
  return `${Math.max(128, Math.round(score * 20 + completed * 12))} pts`;
});

const requestCountLabel = computed(() => `${filteredOrders.value.length} request${filteredOrders.value.length === 1 ? "" : "s"} ready to browse`);

const filteredOrders = computed(() => {
  const list = orderStore.hallOrders || [];

  if (activeFilter.value === "near") {
    return list.filter((order) => order.dorm_building === user.value.dorm_building);
  }

  if (activeFilter.value === "urgent") {
    return list.filter((order) => isUrgentDeadline(order.deadline_at));
  }

  return list;
});

onMounted(() => {
  if (!ensureLoggedIn(userStore)) {
    return;
  }

  orderStore.loadHallOrders({ status: "posted" });
});

function handleSwiperChange(event) {
  promoIndex.value = event.detail.current || 0;
}

function goToDetail(order) {
  uni.navigateTo({
    url: `/pages/order-detail/index?id=${order.id}`
  });
}

function openActionSheet() {
  showActionSheet.value = true;
}

function closeActionSheet() {
  showActionSheet.value = false;
}

function goToCreateOrder() {
  closeActionSheet();
  uni.navigateTo({
    url: "/pages/create-order/index"
  });
}

function goToMine() {
  uni.navigateTo({
    url: "/pages/profile/index"
  });
}
</script>

<template>
  <view class="page">
    <view class="student-card">
      <view class="student-main">
        <view class="logo-box">
          <image class="logo" :src="hubuEmblem" mode="aspectFit" />
        </view>

        <view class="student-copy">
          <text class="eyebrow">{{ `Hubei University (${apartmentLabel})` }}</text>
          <text class="student-name">{{ user.nickname || "Campus student" }}</text>
          <text class="student-note">Trusted runner score {{ user.credit_score || "5.0" }}</text>
          <text class="student-subnote">Ready for pickup today</text>
        </view>
      </view>

      <view class="score-pill">{{ pointsLabel }}</view>
    </view>

    <view class="promo-shell">
      <swiper
        class="promo-swiper"
        circular
        autoplay
        interval="3200"
        duration="450"
        @change="handleSwiperChange"
      >
        <swiper-item v-for="banner in promoBanners" :key="banner.title">
          <view class="promo-card">
            <text class="promo-label">Daily Pick</text>
            <text class="promo-title">{{ banner.title }}</text>
            <text class="promo-copy">{{ banner.copy }}</text>
            <text class="promo-cta">{{ banner.cta }}</text>
          </view>
        </swiper-item>
      </swiper>

      <view class="promo-dots">
        <view
          v-for="(banner, index) in promoBanners"
          :key="banner.title"
          class="promo-dot"
          :class="{ 'promo-dot--active': promoIndex === index }"
        />
      </view>
    </view>

    <view class="section-head">
      <view>
        <text class="section-title">Pickup Requests</text>
        <text class="section-copy">{{ requestCountLabel }}</text>
      </view>
    </view>

    <view class="filter-row">
      <view
        v-for="item in filterItems"
        :key="item.key"
        class="filter-chip"
        :class="{ 'filter-chip--active': activeFilter === item.key }"
        @click="activeFilter = item.key"
      >
        {{ item.label }}
      </view>
    </view>

    <view v-if="orderStore.loading" class="empty-card">
      <text class="empty-title">Loading requests</text>
      <text class="empty-copy">Checking the latest pickup tasks around your apartment.</text>
    </view>
    <view v-else-if="!filteredOrders.length" class="empty-card">
      <text class="empty-title">No requests in this view</text>
      <text class="empty-copy">Try another filter or post a new pickup request from the center button.</text>
    </view>

    <OrderCard
      v-for="order in filteredOrders"
      :key="order.id"
      :order="order"
      @click="goToDetail"
    />

    <view class="bottom-nav">
      <view class="nav-item nav-item--active">
        <view class="nav-icon nav-icon--tray">
          <view class="nav-icon-bar" />
        </view>
        <text class="nav-label">Pick Up</text>
      </view>

      <button class="compose-btn" @click="openActionSheet">+</button>

      <view class="nav-item" @click="goToMine">
        <view class="nav-icon nav-icon--person">
          <view class="nav-icon-head" />
          <view class="nav-icon-body" />
        </view>
        <text class="nav-label">Mine</text>
      </view>
    </view>

    <view v-if="showActionSheet" class="sheet-overlay" @click="closeActionSheet">
      <view class="sheet-card" @click.stop>
        <text class="sheet-title">Create something new</text>
        <button class="sheet-primary" @click="goToCreateOrder">Post a Pickup Request</button>
        <button class="sheet-cancel" @click="closeActionSheet">Cancel</button>
      </view>
    </view>
  </view>
</template>

<style scoped>
.page {
  min-height: 100vh;
  padding: 34rpx 22rpx 176rpx;
  background:
    radial-gradient(circle at top left, rgba(47, 143, 90, 0.06), transparent 24%),
    linear-gradient(180deg, #f8f6ef, #f1f6f1);
}

.student-card,
.promo-shell,
.empty-card,
.bottom-nav,
.sheet-card {
  border-radius: 30rpx;
  background: rgba(255, 255, 255, 0.97);
  border: 1rpx solid rgba(20, 104, 63, 0.08);
  box-shadow: 0 18rpx 48rpx rgba(24, 56, 38, 0.07);
}

.student-card {
  display: flex;
  justify-content: space-between;
  gap: 18rpx;
  padding: 26rpx;
  margin-bottom: 18rpx;
}

.student-main {
  display: flex;
  gap: 20rpx;
  flex: 1;
}

.logo-box {
  width: 104rpx;
  height: 104rpx;
  padding: 8rpx;
  border-radius: 24rpx;
  background: #ffffff;
  box-shadow: inset 0 0 0 1rpx rgba(20, 104, 63, 0.08);
  flex-shrink: 0;
}

.logo {
  width: 100%;
  height: 100%;
}

.student-copy {
  flex: 1;
}

.eyebrow {
  display: block;
  font-size: 20rpx;
  font-weight: 800;
  line-height: 1.4;
  color: #14683f;
}

.student-name {
  display: block;
  margin-top: 10rpx;
  font-size: 40rpx;
  font-weight: 800;
  line-height: 1.08;
  color: #1b2333;
}

.student-note,
.student-subnote {
  display: block;
  font-size: 22rpx;
  line-height: 1.45;
}

.student-note {
  margin-top: 14rpx;
  color: #5f6a7b;
}

.student-subnote {
  margin-top: 6rpx;
  color: #7a8596;
}

.score-pill {
  align-self: flex-start;
  padding: 14rpx 18rpx;
  border-radius: 999px;
  background: rgba(20, 104, 63, 0.08);
  color: #14683f;
  font-size: 22rpx;
  font-weight: 800;
}

.promo-shell {
  padding: 14rpx 14rpx 18rpx;
  margin-bottom: 20rpx;
}

.promo-swiper {
  height: 300rpx;
}

.promo-card {
  height: 100%;
  border-radius: 24rpx;
  padding: 26rpx;
  background:
    radial-gradient(circle at right top, rgba(47, 143, 90, 0.12), transparent 34%),
    linear-gradient(135deg, #f7fbf6, #eef7ef);
}

.promo-label {
  display: inline-flex;
  padding: 8rpx 14rpx;
  border-radius: 999px;
  background: rgba(20, 104, 63, 0.08);
  color: #14683f;
  font-size: 18rpx;
  font-weight: 800;
  letter-spacing: 1.2rpx;
  text-transform: uppercase;
}

.promo-title {
  display: block;
  margin-top: 18rpx;
  font-size: 42rpx;
  line-height: 1.12;
  font-weight: 800;
  color: #1b2333;
}

.promo-copy {
  display: block;
  margin-top: 14rpx;
  font-size: 24rpx;
  line-height: 1.55;
  color: #617081;
}

.promo-cta {
  display: block;
  margin-top: 22rpx;
  font-size: 22rpx;
  font-weight: 800;
  color: #14683f;
}

.promo-dots {
  display: flex;
  justify-content: center;
  gap: 10rpx;
  margin-top: 14rpx;
}

.promo-dot {
  width: 14rpx;
  height: 14rpx;
  border-radius: 999px;
  background: rgba(20, 104, 63, 0.14);
}

.promo-dot--active {
  width: 38rpx;
  background: #14683f;
}

.section-head {
  margin-bottom: 14rpx;
}

.section-title {
  display: block;
  font-size: 34rpx;
  font-weight: 800;
  color: #1b2333;
}

.section-copy {
  display: block;
  margin-top: 8rpx;
  font-size: 23rpx;
  color: #6c7587;
}

.filter-row {
  display: flex;
  gap: 12rpx;
  margin-bottom: 18rpx;
  overflow-x: auto;
}

.filter-chip {
  flex-shrink: 0;
  padding: 14rpx 22rpx;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.82);
  border: 1rpx solid rgba(20, 104, 63, 0.08);
  color: #607183;
  font-size: 22rpx;
  font-weight: 700;
}

.filter-chip--active {
  background: #14683f;
  color: #ffffff;
}

.empty-card {
  padding: 28rpx;
  margin-bottom: 18rpx;
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
  line-height: 1.55;
  color: #6c7587;
}

.bottom-nav {
  position: fixed;
  left: 22rpx;
  right: 22rpx;
  bottom: 22rpx;
  height: 116rpx;
  padding: 18rpx 28rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 20;
}

.nav-item {
  width: 130rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8rpx;
  color: #768293;
}

.nav-item--active {
  color: #14683f;
}

.nav-icon {
  position: relative;
  width: 42rpx;
  height: 42rpx;
}

.nav-icon--tray {
  border: 3rpx solid currentColor;
  border-radius: 12rpx;
}

.nav-icon-bar {
  position: absolute;
  left: 8rpx;
  right: 8rpx;
  top: 11rpx;
  height: 3rpx;
  border-radius: 999px;
  background: currentColor;
}

.nav-icon--person {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.nav-icon-head {
  width: 16rpx;
  height: 16rpx;
  border-radius: 999px;
  background: currentColor;
}

.nav-icon-body {
  width: 28rpx;
  height: 14rpx;
  margin-top: 4rpx;
  border-radius: 14rpx 14rpx 8rpx 8rpx;
  border: 3rpx solid currentColor;
  border-bottom: 0;
}

.nav-label {
  font-size: 20rpx;
  font-weight: 800;
}

.compose-btn {
  width: 108rpx;
  height: 108rpx;
  margin-top: -56rpx;
  border-radius: 999px;
  background: linear-gradient(135deg, #14683f, #2f8f5a);
  color: #ffffff;
  font-size: 54rpx;
  font-weight: 700;
  line-height: 108rpx;
  box-shadow: 0 18rpx 42rpx rgba(20, 104, 63, 0.24);
}

.sheet-overlay {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(16, 24, 21, 0.28);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding: 0 18rpx 22rpx;
  z-index: 40;
}

.sheet-card {
  width: 100%;
  padding: 26rpx;
  border-radius: 34rpx 34rpx 24rpx 24rpx;
}

.sheet-title {
  display: block;
  text-align: center;
  font-size: 26rpx;
  font-weight: 800;
  color: #1b2333;
  margin-bottom: 20rpx;
}

.sheet-primary,
.sheet-cancel {
  height: 88rpx;
  border-radius: 999px;
  font-size: 26rpx;
  font-weight: 800;
  line-height: 88rpx;
}

.sheet-primary {
  background: linear-gradient(135deg, #14683f, #2f8f5a);
  color: #ffffff;
  margin-bottom: 14rpx;
}

.sheet-cancel {
  background: rgba(20, 104, 63, 0.06);
  color: #4f5f6d;
}
</style>
