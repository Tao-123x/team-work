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
  gap: 16rpx;
  margin: 22rpx 0 26rpx;
}

.metric-card {
  flex: 1;
  padding: 22rpx;
  border-radius: 24rpx;
  background: rgba(255, 255, 255, 0.78);
}

.metric-value {
  display: block;
  font-size: 40rpx;
  font-weight: 800;
  color: #0f172a;
}

.metric-label {
  display: block;
  margin-top: 8rpx;
  font-size: 22rpx;
  color: #526072;
}

.primary-btn,
.secondary-btn {
  border-radius: 999px;
  font-size: 26rpx;
  font-weight: 700;
}

.primary-btn {
  background: #111111;
  color: #ffffff;
}

.secondary-btn {
  margin-top: 14rpx;
  background: rgba(255, 255, 255, 0.78);
  color: #0f172a;
}
</style>
