<script setup>
import { computed, ref } from "vue";
import { onLoad } from "@dcloudio/uni-app";
import EntryHeroStage from "../../components/entry-demo/EntryHeroStage.vue";
import EntryScreenShell from "../../components/entry-demo/EntryScreenShell.vue";
import { getEntryTheme } from "../../utils/entryThemes";

const themeId = ref("bell");

onLoad((query) => {
  themeId.value = query?.theme || "bell";
});

const theme = computed(() => getEntryTheme(themeId.value));

function goToLogin() {
  uni.navigateTo({
    url: `/pages/entry-demo/login?theme=${theme.value.id}`
  });
}

function goToRegister() {
  uni.navigateTo({
    url: `/pages/entry-demo/register?theme=${theme.value.id}`
  });
}
</script>

<template>
  <EntryScreenShell
    :theme="theme"
    :eyebrow="theme.splash.eyebrow"
    :title="theme.splash.title"
    :subtitle="theme.splash.subtitle"
  >
    <template #hero>
      <EntryHeroStage :theme="theme" />
    </template>

    <view class="chips">
      <text class="chip">{{ theme.campusTag }}</text>
      <text class="chip alt">{{ theme.deliveryTag }}</text>
    </view>

    <view class="story-panel">
      <text class="story-kicker">{{ theme.splash.kicker }}</text>
      <text class="story-copy">
        The splash screen sets the tone before the user interacts with the real system. It is meant
        to show trust, speed, and a more campus-specific product identity.
      </text>
    </view>

    <view class="metrics">
      <view class="metric-card">
        <text class="metric-value">3s</text>
        <text class="metric-label">first-screen clarity</text>
      </view>
      <view class="metric-card">
        <text class="metric-value">2</text>
        <text class="metric-label">campus color anchors</text>
      </view>
    </view>

    <button class="primary-btn" @click="goToLogin">{{ theme.splash.primaryLabel }}</button>
    <button class="secondary-btn" @click="goToRegister">{{ theme.splash.secondaryLabel }}</button>
  </EntryScreenShell>
</template>

<style scoped>
.chips {
  display: flex;
  gap: 14rpx;
  flex-wrap: wrap;
}

.chip {
  display: inline-flex;
  padding: 12rpx 18rpx;
  border-radius: 999px;
  background: rgba(30, 123, 77, 0.1);
  color: #1e7b4d;
  font-size: 22rpx;
  font-weight: 700;
}

.chip.alt {
  background: rgba(17, 76, 149, 0.1);
  color: #114c95;
}

.metrics {
  display: flex;
  gap: 24rpx;
  margin: 32rpx 0 40rpx;
}

.story-panel {
  margin-top: 24rpx;
  padding: 28rpx;
  border-radius: 30rpx;
  background: rgba(9, 17, 31, 0.88);
  box-shadow: 0 24rpx 52rpx rgba(15, 23, 42, 0.16);
}

.story-kicker {
  display: block;
  font-size: 26rpx;
  line-height: 1.45;
  font-weight: 800;
  color: #ffffff;
}

.story-copy {
  display: block;
  margin-top: 10rpx;
  font-size: 24rpx;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.74);
}

.metric-card {
  flex: 1;
  padding: 40rpx 32rpx;
  border-radius: 40rpx;
  background: rgba(255, 255, 255, 0.35);
  backdrop-filter: blur(48rpx);
  -webkit-backdrop-filter: blur(48rpx);
  border: 2rpx solid rgba(255, 255, 255, 0.6);
  box-shadow: 
    0 32rpx 64rpx rgba(15, 23, 42, 0.06),
    inset 0 4rpx 20rpx rgba(255, 255, 255, 0.5);
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.metric-card:hover {
  transform: translateY(-8rpx) scale(1.02);
}

.metric-value {
  display: block;
  font-size: 64rpx;
  font-weight: 900;
  letter-spacing: -3rpx;
  color: var(--text-strong);
}

.metric-label {
  display: block;
  margin-top: 12rpx;
  font-size: 26rpx;
  font-weight: 600;
  color: var(--text-muted);
}

.primary-btn,
.secondary-btn {
  border-radius: 40rpx;
  font-size: 32rpx;
  font-weight: 900;
  height: 112rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.primary-btn {
  background: var(--text-strong);
  color: var(--panel);
  box-shadow: 0 32rpx 64rpx rgba(0, 0, 0, 0.2);
}

.primary-btn:active {
  transform: scale(0.96) translateY(8rpx);
  box-shadow: 0 12rpx 24rpx rgba(0, 0, 0, 0.15);
}

.secondary-btn {
  margin-top: 24rpx;
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(32rpx);
  border: 2rpx solid rgba(255, 255, 255, 0.7);
  color: var(--text-strong);
  box-shadow: 0 16rpx 40rpx rgba(0, 0, 0, 0.05);
}

.secondary-btn:active {
  transform: scale(0.96);
  background: rgba(255, 255, 255, 0.9);
}
</style>
