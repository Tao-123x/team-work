<script setup>
import { computed } from "vue";

const props = defineProps({
  theme: {
    type: Object,
    required: true
  },
  compact: {
    type: Boolean,
    default: false
  }
});

const stageStyle = computed(() => ({
  "--accent": props.theme.shell.accent,
  "--accent-soft": props.theme.shell.accentSoft,
  "--secondary": props.theme.shell.secondary
}));
</script>

<template>
  <view class="hero-stage" :class="[theme.heroKind, { compact }]" :style="stageStyle">
    <view class="glow glow-left" />
    <view class="glow glow-right" />

    <template v-if="theme.heroKind === 'bell'">
      <view class="bell-shell">
        <view class="bell-top" />
        <view class="bell-body">
          <view class="clock-ring">
            <view class="clock-hand short" />
            <view class="clock-hand long" />
          </view>
        </view>
        <view class="bell-base" />
      </view>
      <view class="bell-wave one" />
      <view class="bell-wave two" />
    </template>

    <template v-else-if="theme.heroKind === 'card'">
      <view class="card-stack">
        <view class="stack-card back">
          <view class="stack-dot" />
          <view class="stack-line short" />
          <view class="stack-line" />
        </view>
        <view class="stack-card middle">
          <view class="stack-dot secondary" />
          <view class="stack-line short" />
          <view class="stack-line" />
        </view>
        <view class="stack-card front">
          <view class="stack-chip">DORM A</view>
          <view class="stack-title">Takeaway shelf</view>
          <view class="stack-line" />
          <view class="stack-footer">
            <view class="stack-badge">¥2.00</view>
            <view class="stack-pill">Fast pick-up</view>
          </view>
        </view>
      </view>
    </template>

    <template v-else>
      <view class="route-stage">
        <view class="route-node shelf">Shelf</view>
        <view class="route-path">
          <view class="route-dot moving" />
        </view>
        <view class="route-node dorm">Dorm</view>
      </view>
      <view class="route-halo one" />
      <view class="route-halo two" />
    </template>
  </view>
</template>

<style scoped>
.hero-stage {
  position: relative;
  height: 340rpx;
  border-radius: 36rpx;
  overflow: hidden;
}

.compact {
  height: 260rpx;
}

.glow {
  position: absolute;
  border-radius: 999px;
  filter: blur(40rpx);
  opacity: 0.35;
  mix-blend-mode: multiply;
}

.glow-left {
  width: 220rpx;
  height: 220rpx;
  background: var(--accent);
  left: -20rpx;
  top: -20rpx;
  animation: glowFloat 6s cubic-bezier(0.4, 0, 0.2, 1) infinite alternate;
}

.glow-right {
  width: 200rpx;
  height: 200rpx;
  background: var(--secondary);
  right: -20rpx;
  bottom: -20rpx;
  animation: glowFloat 7s cubic-bezier(0.4, 0, 0.2, 1) infinite alternate-reverse;
}

.bell-shell {
  position: absolute;
  left: 50%;
  bottom: 28rpx;
  transform: translateX(-50%);
  width: 220rpx;
  animation: riseFadeBell 0.95s cubic-bezier(0.2, 0.7, 0.2, 1) both;
}

.bell-top {
  width: 84rpx;
  height: 44rpx;
  margin: 0 auto -8rpx;
  border-radius: 28rpx 28rpx 0 0;
  background: var(--accent);
}

.bell-body {
  position: relative;
  width: 220rpx;
  height: 180rpx;
  margin: 0 auto;
  background: linear-gradient(180deg, var(--accent-soft), var(--accent));
  clip-path: polygon(22% 0%, 78% 0%, 92% 100%, 8% 100%);
  border-radius: 20rpx;
}

.clock-ring {
  position: absolute;
  left: 50%;
  top: 40rpx;
  transform: translateX(-50%);
  width: 86rpx;
  height: 86rpx;
  border-radius: 999px;
  border: 8rpx solid rgba(255, 255, 255, 0.78);
  background: rgba(255, 255, 255, 0.1);
}

.clock-hand {
  position: absolute;
  left: 50%;
  top: 50%;
  transform-origin: bottom center;
  background: #ffffff;
  border-radius: 999px;
}

.clock-hand.short {
  width: 6rpx;
  height: 22rpx;
  transform: translate(-50%, -100%) rotate(12deg);
}

.clock-hand.long {
  width: 6rpx;
  height: 32rpx;
  transform: translate(-50%, -100%) rotate(90deg);
}

.bell-base {
  width: 160rpx;
  height: 20rpx;
  background: var(--secondary);
  border-radius: 999px;
  margin: 10rpx auto 0;
}

.bell-wave {
  position: absolute;
  left: 50%;
  top: 52rpx;
  transform: translateX(-50%);
  border: 4rpx solid rgba(17, 76, 149, 0.16);
  border-radius: 999px;
}

.bell-wave.one {
  width: 240rpx;
  height: 240rpx;
  animation: pulseRingBell 2.8s ease-out infinite;
}

.bell-wave.two {
  width: 310rpx;
  height: 310rpx;
  animation: pulseRingBell 2.8s ease-out 1s infinite;
}

.card-stack {
  position: absolute;
  left: 50%;
  top: 54%;
  width: 320rpx;
  height: 210rpx;
  transform: translate(-50%, -50%);
}

.stack-card {
  position: absolute;
  inset: 0;
  background: rgba(255, 255, 255, 0.96);
  border-radius: 32rpx;
  padding: 24rpx;
  box-shadow: 
    0 24rpx 60rpx rgba(0, 0, 0, 0.12),
    inset 0 2rpx 0 rgba(255, 255, 255, 1);
  border: 1rpx solid rgba(255, 255, 255, 0.6);
}

.back {
  transform: translate(-30rpx, 24rpx) rotate(-10deg);
  background: rgba(187, 240, 210, 0.65);
  backdrop-filter: blur(10rpx);
  animation: floatCardBack 6s cubic-bezier(0.4, 0, 0.2, 1) infinite alternate;
}

.middle {
  transform: translate(24rpx, -12rpx) rotate(8deg);
  background: rgba(41, 121, 255, 0.18);
  backdrop-filter: blur(10rpx);
  animation: floatCardMiddle 5.5s cubic-bezier(0.4, 0, 0.2, 1) infinite alternate-reverse;
}

.front {
  transform: translateY(0) rotate(-2deg);
  animation: riseFadeCard 1s cubic-bezier(0.2, 0.8, 0.2, 1) both;
}

.stack-dot,
.stack-line,
.stack-badge,
.stack-pill,
.stack-chip {
  display: inline-flex;
}

.stack-dot {
  width: 18rpx;
  height: 18rpx;
  border-radius: 999px;
  background: var(--accent);
  margin-bottom: 12rpx;
}

.stack-dot.secondary {
  background: var(--secondary);
}

.stack-chip {
  padding: 8rpx 16rpx;
  border-radius: 999px;
  background: rgba(25, 159, 86, 0.12);
  color: var(--accent);
  font-size: 20rpx;
  font-weight: 700;
}

.stack-title {
  margin-top: 16rpx;
  font-size: 34rpx;
  font-weight: 700;
  color: #0f172a;
}

.stack-line {
  width: 100%;
  height: 14rpx;
  border-radius: 999px;
  background: rgba(15, 23, 42, 0.08);
  margin-top: 12rpx;
}

.stack-line.short {
  width: 56%;
}

.stack-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 22rpx;
}

.stack-badge,
.stack-pill {
  padding: 10rpx 18rpx;
  border-radius: 999px;
  font-size: 22rpx;
  font-weight: 700;
}

.stack-badge {
  background: rgba(17, 17, 17, 0.92);
  color: #ffffff;
}

.stack-pill {
  background: rgba(33, 98, 216, 0.12);
  color: var(--secondary);
}

.route-stage {
  position: absolute;
  left: 50%;
  top: 52%;
  width: 320rpx;
  transform: translate(-50%, -50%);
}

.route-node {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  min-width: 98rpx;
  padding: 16rpx 20rpx;
  border-radius: 24rpx;
  background: rgba(255, 255, 255, 0.92);
  text-align: center;
  font-size: 24rpx;
  font-weight: 700;
  color: #0f172a;
  box-shadow: 0 16rpx 36rpx rgba(15, 23, 42, 0.08);
}

.route-node.shelf {
  left: 0;
}

.route-node.dorm {
  right: 0;
}

.route-path {
  position: relative;
  margin: 0 82rpx;
  height: 160rpx;
}

.route-path::before {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  top: 54rpx;
  height: 52rpx;
  border: 6rpx dashed rgba(24, 121, 78, 0.38);
  border-left: 0;
  border-right: 0;
  border-radius: 999px;
}

.route-dot {
  position: absolute;
  top: 64rpx;
  width: 32rpx;
  height: 32rpx;
  border-radius: 999px;
  background: linear-gradient(135deg, var(--accent), var(--secondary));
  box-shadow: 0 8rpx 20rpx rgba(0, 0, 0, 0.15);
}

.route-dot.moving {
  animation: moveDot 3.4s cubic-bezier(0.22, 0.8, 0.22, 1) infinite;
}

.route-halo {
  position: absolute;
  border-radius: 999px;
  border: 4rpx solid rgba(33, 98, 216, 0.14);
}

.route-halo.one {
  width: 220rpx;
  height: 220rpx;
  right: 18rpx;
  top: 16rpx;
  animation: pulseRingRoute 3.2s ease-out infinite;
}

.route-halo.two {
  width: 180rpx;
  height: 180rpx;
  left: 22rpx;
  bottom: 20rpx;
  animation: pulseRingRoute 3.2s ease-out 1.3s infinite;
}

@keyframes riseFadeBell {
  from {
    transform: translateX(-50%) translateY(28rpx);
    opacity: 0;
  }
  to {
    transform: translateX(-50%) translateY(0);
    opacity: 1;
  }
}

@keyframes riseFadeCard {
  from {
    transform: translateY(20rpx) rotate(-2deg);
    opacity: 0;
  }
  to {
    transform: translateY(0) rotate(-2deg);
    opacity: 1;
  }
}

@keyframes pulseRingBell {
  0% {
    transform: translateX(-50%) scale(0.88);
    opacity: 0;
  }
  30% {
    opacity: 0.5;
  }
  100% {
    transform: translateX(-50%) scale(1.08);
    opacity: 0;
  }
}

@keyframes pulseRingRoute {
  0% {
    transform: scale(0.88);
    opacity: 0;
  }
  30% {
    opacity: 0.5;
  }
  100% {
    transform: scale(1.08);
    opacity: 0;
  }
}

@keyframes glowFloat {
  0%, 100% {
    transform: translate3d(0, 0, 0);
  }
  50% {
    transform: translate3d(0, -14rpx, 0);
  }
}

@keyframes floatCardBack {
  0%, 100% {
    transform: translate(-24rpx, 20rpx) rotate(-8deg);
  }
  50% {
    transform: translate(-24rpx, 10rpx) rotate(-5deg);
  }
}

@keyframes floatCardMiddle {
  0%, 100% {
    transform: translate(18rpx, -8rpx) rotate(7deg);
  }
  50% {
    transform: translate(18rpx, -18rpx) rotate(10deg);
  }
}

@keyframes moveDot {
  0% {
    left: 0;
  }
  50% {
    left: calc(100% - 26rpx);
  }
  100% {
    left: 0;
  }
}
</style>
