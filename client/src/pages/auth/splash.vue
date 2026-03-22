<script setup>
import { onMounted, onUnmounted } from "vue";
import hubuEmblem from "../../assets/hubu-emblem.jpg";
import { useUserStore } from "../../store/user";

const userStore = useUserStore();
let timerId = null;

onMounted(() => {
  timerId = setTimeout(() => {
    uni.reLaunch({
      url: userStore.isLoggedIn ? "/pages/home/index" : "/pages/auth/login"
    });
  }, 1700);
});

onUnmounted(() => {
  if (timerId) {
    clearTimeout(timerId);
  }
});
</script>

<template>
  <view class="page">
    <view class="card">
      <view class="logo-wrap">
        <image class="logo" :src="hubuEmblem" mode="aspectFit" />
      </view>

      <text class="school-name">Hubei University</text>
      <text class="app-name">Dorm Takeaway Relay</text>
      <text class="subline">Campus pickup and delivery demo platform</text>

      <view class="bee-stage">
        <view class="bee-track">
          <view class="bee">
            <view class="bee-wing left" />
            <view class="bee-wing right" />
            <view class="bee-body" />
            <view class="bee-stripe one" />
            <view class="bee-stripe two" />
          </view>
        </view>
      </view>

      <view class="loading-block">
        <view class="progress-track">
          <view class="progress-bar" />
        </view>
        <view class="dots">
          <view class="dot one" />
          <view class="dot two" />
          <view class="dot three" />
        </view>
      </view>
    </view>
  </view>
</template>

<style scoped>
.page {
  min-height: 100vh;
  padding: 40rpx 28rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  background:
    radial-gradient(circle at top left, rgba(47, 143, 90, 0.12), transparent 30%),
    radial-gradient(circle at bottom right, rgba(19, 104, 63, 0.14), transparent 34%),
    linear-gradient(180deg, #f4f8f3, #edf6ef);
}

.card {
  width: 100%;
  max-width: 640rpx;
  padding: 60rpx 40rpx 48rpx;
  border-radius: 32rpx;
  background: rgba(255, 255, 255, 0.94);
  border: 1rpx solid rgba(17, 119, 74, 0.08);
  box-shadow: 0 24rpx 60rpx rgba(24, 56, 38, 0.08);
  text-align: center;
}

.logo-wrap {
  width: 168rpx;
  height: 168rpx;
  margin: 0 auto 26rpx;
  padding: 14rpx;
  border-radius: 36rpx;
  background: #ffffff;
  box-shadow: inset 0 0 0 1rpx rgba(17, 119, 74, 0.08);
}

.logo {
  width: 100%;
  height: 100%;
}

.school-name {
  display: block;
  font-size: 38rpx;
  font-weight: 800;
  color: #14683f;
  letter-spacing: 2rpx;
}

.app-name {
  display: block;
  margin-top: 18rpx;
  font-size: 54rpx;
  line-height: 1.08;
  font-weight: 800;
  color: #1b2333;
}

.subline {
  display: block;
  margin-top: 16rpx;
  font-size: 24rpx;
  color: #6c7587;
}

.bee-stage {
  margin-top: 28rpx;
}

.bee-track {
  position: relative;
  width: 180rpx;
  height: 64rpx;
  margin: 0 auto;
}

.bee-track::before {
  content: "";
  position: absolute;
  left: 8rpx;
  right: 8rpx;
  top: 50%;
  height: 2rpx;
  background: linear-gradient(90deg, transparent, rgba(47, 143, 90, 0.14), transparent);
}

.bee {
  position: absolute;
  left: 0;
  top: 8rpx;
  width: 52rpx;
  height: 38rpx;
  animation: bee-drift 2.8s ease-in-out infinite;
}

.bee-wing {
  position: absolute;
  top: 2rpx;
  width: 18rpx;
  height: 14rpx;
  border-radius: 16rpx 16rpx 8rpx 8rpx;
  background: rgba(196, 233, 209, 0.82);
}

.bee-wing.left {
  left: 4rpx;
  transform: rotate(-26deg);
}

.bee-wing.right {
  right: 4rpx;
  transform: rotate(26deg);
}

.bee-body {
  position: absolute;
  left: 50%;
  bottom: 0;
  width: 22rpx;
  height: 30rpx;
  margin-left: -11rpx;
  border-radius: 14rpx;
  background: linear-gradient(180deg, #ffd768, #f1ae2c);
}

.bee-stripe {
  position: absolute;
  left: 50%;
  width: 14rpx;
  height: 4rpx;
  margin-left: -7rpx;
  border-radius: 999px;
  background: #1f2633;
}

.bee-stripe.one {
  bottom: 15rpx;
}

.bee-stripe.two {
  bottom: 8rpx;
}

.loading-block {
  margin-top: 42rpx;
}

.progress-track {
  height: 10rpx;
  border-radius: 999px;
  background: rgba(20, 104, 63, 0.08);
  overflow: hidden;
}

.progress-bar {
  width: 42%;
  height: 100%;
  border-radius: 999px;
  background: linear-gradient(90deg, #2f8f5a, #6fbe8b);
  animation: progress 1.7s ease-in-out infinite;
}

.dots {
  display: flex;
  justify-content: center;
  gap: 12rpx;
  margin-top: 22rpx;
}

.dot {
  width: 12rpx;
  height: 12rpx;
  border-radius: 999px;
  background: #2f8f5a;
  opacity: 0.28;
  animation: blink 1.4s ease-in-out infinite;
}

.dot.two {
  animation-delay: 0.18s;
}

.dot.three {
  animation-delay: 0.36s;
}

@keyframes progress {
  0% {
    transform: translateX(-110%);
  }

  100% {
    transform: translateX(250%);
  }
}

@keyframes blink {
  0%,
  100% {
    opacity: 0.24;
    transform: scale(0.9);
  }

  50% {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes bee-drift {
  0%,
  100% {
    transform: translateX(0) translateY(0);
  }

  50% {
    transform: translateX(128rpx) translateY(-6rpx);
  }
}
</style>
