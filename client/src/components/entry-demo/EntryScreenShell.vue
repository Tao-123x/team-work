<script setup>
import { computed } from "vue";

const props = defineProps({
  theme: {
    type: Object,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  subtitle: {
    type: String,
    required: true
  },
  eyebrow: {
    type: String,
    default: ""
  },
  showBack: {
    type: Boolean,
    default: true
  }
});

const shellStyle = computed(() => ({
  "--bg-start": props.theme.shell.bgStart,
  "--bg-end": props.theme.shell.bgEnd,
  "--accent": props.theme.shell.accent,
  "--accent-soft": props.theme.shell.accentSoft,
  "--secondary": props.theme.shell.secondary,
  "--panel": props.theme.shell.panel,
  "--text-strong": props.theme.shell.textStrong,
  "--text-muted": props.theme.shell.textMuted
}));

function handleBack() {
  if (getCurrentPages().length > 1) {
    uni.navigateBack();
    return;
  }

  uni.redirectTo({
    url: "/pages/entry-demo/index"
  });
}
</script>

<template>
  <view class="entry-shell" :style="shellStyle">
    <view class="background-grid" />
    <view class="background-band band-a" />
    <view class="background-band band-b" />

    <view class="topbar">
      <button v-if="showBack" class="nav-btn ghost" @click="handleBack">Back</button>
      <button class="nav-btn">{{ theme.name }}</button>
    </view>

    <view class="hero-copy">
      <text v-if="eyebrow" class="eyebrow">{{ eyebrow }}</text>
      <text class="title">{{ title }}</text>
      <text class="subtitle">{{ subtitle }}</text>
    </view>

    <slot name="hero" />

    <view class="content-card">
      <slot />
    </view>
  </view>
</template>

<style scoped>
.entry-shell {
  min-height: 100vh;
  padding: 32rpx 24rpx 28rpx;
  background: linear-gradient(180deg, var(--bg-start), var(--bg-end));
  position: relative;
  overflow: hidden;
}

.background-grid {
  position: absolute;
  inset: 0;
  opacity: 0.08;
  background-image:
    linear-gradient(rgba(17, 24, 39, 0.08) 1px, transparent 1px),
    linear-gradient(90deg, rgba(17, 24, 39, 0.08) 1px, transparent 1px);
  background-size: 44rpx 44rpx;
}

.background-band {
  position: absolute;
  border-radius: 999px;
  filter: blur(8rpx);
  opacity: 0.24;
}

.band-a {
  width: 360rpx;
  height: 360rpx;
  background: var(--accent-soft);
  top: -40rpx;
  right: -60rpx;
}

.band-b {
  width: 300rpx;
  height: 300rpx;
  background: rgba(33, 98, 216, 0.18);
  left: -60rpx;
  top: 260rpx;
}

.topbar {
  position: relative;
  z-index: 2;
  display: flex;
  justify-content: space-between;
  margin-bottom: 28rpx;
}

.nav-btn {
  border: 0;
  border-radius: 999px;
  padding: 0 24rpx;
  height: 68rpx;
  line-height: 68rpx;
  font-size: 24rpx;
  font-weight: 700;
  color: var(--text-strong);
  background: rgba(255, 255, 255, 0.7);
  box-shadow: 0 10rpx 26rpx rgba(15, 23, 42, 0.05);
}

.ghost {
  background: rgba(255, 255, 255, 0.9);
}

.hero-copy {
  position: relative;
  z-index: 2;
  margin-bottom: 18rpx;
  animation: copyUp 0.7s cubic-bezier(0.2, 0.7, 0.2, 1) both;
}

.eyebrow {
  display: inline-flex;
  margin-bottom: 16rpx;
  padding: 10rpx 18rpx;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.76);
  color: var(--accent);
  font-size: 22rpx;
  font-weight: 700;
}

.title {
  display: block;
  font-size: 68rpx;
  line-height: 1.02;
  font-weight: 800;
  color: var(--text-strong);
  letter-spacing: -1rpx;
}

.subtitle {
  display: block;
  margin-top: 18rpx;
  font-size: 28rpx;
  line-height: 1.58;
  color: var(--text-muted);
  max-width: 88%;
}

.content-card {
  position: relative;
  z-index: 2;
  margin-top: 20rpx;
  border-radius: 34rpx;
  background: rgba(255, 255, 255, 0.86);
  backdrop-filter: blur(18rpx);
  padding: 28rpx;
  box-shadow: 0 24rpx 60rpx rgba(15, 23, 42, 0.08);
  animation: cardUp 0.88s cubic-bezier(0.2, 0.7, 0.2, 1) both;
}

@keyframes copyUp {
  from {
    transform: translateY(22rpx);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes cardUp {
  from {
    transform: translateY(28rpx);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>
