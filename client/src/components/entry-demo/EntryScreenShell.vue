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
    <view class="background-orb orb-a" />
    <view class="background-orb orb-b" />

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
      <view class="content-sheen" />
      <slot />
    </view>
  </view>
</template>

<style scoped>
.entry-shell {
  min-height: 100vh;
  padding: 24rpx 32rpx 48rpx;
  background: var(--bg-end);
  position: relative;
  overflow: hidden;
}

.background-grid {
  position: absolute;
  inset: 0;
  opacity: 0.04;
  background-image:
    linear-gradient(rgba(17, 24, 39, 1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(17, 24, 39, 1) 1px, transparent 1px);
  background-size: 80rpx 80rpx;
}

.background-band {
  position: absolute;
  border-radius: 999px;
  filter: blur(100rpx);
  opacity: 0.6;
  mix-blend-mode: color-burn;
}

.background-orb {
  position: absolute;
  border-radius: 999px;
  border: 2rpx solid rgba(255, 255, 255, 0.26);
  opacity: 0.4;
}

.band-a {
  width: 800rpx;
  height: 800rpx;
  background: radial-gradient(circle, var(--accent-soft), var(--bg-start));
  top: -200rpx;
  right: -250rpx;
  animation: floatBandA 18s cubic-bezier(0.4, 0, 0.2, 1) infinite alternate;
}

.band-b {
  width: 700rpx;
  height: 700rpx;
  background: radial-gradient(circle, var(--secondary), transparent);
  left: -200rpx;
  bottom: -100rpx;
  animation: floatBandB 22s cubic-bezier(0.4, 0, 0.2, 1) infinite alternate-reverse;
}

.orb-a {
  width: 420rpx;
  height: 420rpx;
  right: -80rpx;
  top: 260rpx;
}

.orb-b {
  width: 280rpx;
  height: 280rpx;
  left: 24rpx;
  bottom: 280rpx;
}

.topbar {
  position: relative;
  z-index: 2;
  display: flex;
  justify-content: space-between;
  margin-bottom: 48rpx;
}

.nav-btn {
  border: 0;
  border-radius: 999px;
  padding: 0 28rpx;
  height: 68rpx;
  line-height: 68rpx;
  font-size: 24rpx;
  font-weight: 700;
  color: var(--text-strong);
  background: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(12rpx);
  border: 1rpx solid rgba(255, 255, 255, 0.6);
  box-shadow: 0 8rpx 20rpx rgba(15, 23, 42, 0.06);
  transition: all 0.3s ease;
}

.nav-btn:active {
  transform: scale(0.96);
  background: rgba(255, 255, 255, 0.6);
}

.ghost {
  background: rgba(255, 255, 255, 0.7);
}

.hero-copy {
  position: relative;
  z-index: 2;
  margin-bottom: 40rpx;
  animation: copyUp 1s cubic-bezier(0.16, 1, 0.3, 1) both;
}

.eyebrow {
  display: inline-block;
  margin-bottom: 24rpx;
  padding: 12rpx 24rpx;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.9);
  color: var(--text-strong);
  font-size: 20rpx;
  font-weight: 800;
  letter-spacing: 2rpx;
  text-transform: uppercase;
  box-shadow: 0 12rpx 24rpx rgba(0, 0, 0, 0.04);
}

.title {
  display: block;
  font-size: 84rpx;
  line-height: 0.92;
  font-weight: 900;
  color: var(--text-strong);
  letter-spacing: -3rpx;
}

.subtitle {
  display: block;
  margin-top: 24rpx;
  font-size: 30rpx;
  line-height: 1.5;
  color: var(--text-muted);
  font-weight: 500;
  max-width: 90%;
}

.content-card {
  position: relative;
  z-index: 2;
  margin-top: 48rpx;
  padding: 36rpx 30rpx 34rpx;
  border-radius: 40rpx;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.64),
    rgba(255, 255, 255, 0.36)
  );
  backdrop-filter: blur(28rpx);
  -webkit-backdrop-filter: blur(28rpx);
  border: 1rpx solid rgba(255, 255, 255, 0.85);
  box-shadow:
    0 28rpx 70rpx rgba(15, 23, 42, 0.08),
    inset 0 1rpx 0 rgba(255, 255, 255, 0.95);
  animation: cardUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) both 0.1s;
  overflow: hidden;
}

.content-sheen {
  position: absolute;
  inset: 0;
  background: linear-gradient(120deg, rgba(255, 255, 255, 0.42), transparent 38%, transparent 64%, rgba(255, 255, 255, 0.14));
  pointer-events: none;
}

@keyframes copyUp {
  from {
    transform: translateY(24rpx);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes cardUp {
  from {
    transform: translateY(32rpx);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes floatBandA {
  0% { transform: translate(0, 0) scale(1); }
  100% { transform: translate(-40rpx, 40rpx) scale(1.1); }
}

@keyframes floatBandB {
  0% { transform: translate(0, 0) scale(1); }
  100% { transform: translate(40rpx, -40rpx) scale(1.15); }
}
</style>
