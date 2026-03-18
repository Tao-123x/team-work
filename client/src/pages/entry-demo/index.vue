<script setup>
import DemoPreviewCard from "../../components/entry-demo/DemoPreviewCard.vue";
import { entryThemes } from "../../utils/entryThemes";

function openScene(themeId, scene) {
  uni.navigateTo({
    url: `/pages/entry-demo/${scene}?theme=${themeId}`
  });
}
</script>

<template>
  <view class="page">
    <view class="hero">
      <text class="eyebrow">Uber Eats-inspired entry studies</text>
      <text class="title">Choose an entry motion direction.</text>
      <text class="subtitle">
        Three concepts for splash, login, and register. All keep the same field model, but each
        changes the first-screen rhythm, hierarchy, and campus expression.
      </text>
      <view class="note-panel">
        <text class="note-title">This round is for style selection.</text>
        <text class="note-copy">Pick one concept first, then we can merge the chosen motion system into the real app flow.</text>
      </view>
    </view>

    <DemoPreviewCard
      v-for="theme in entryThemes"
      :key="theme.id"
      :theme="theme"
      @open="(scene) => openScene(theme.id, scene)"
    />
  </view>
</template>

<style scoped>
.page {
  min-height: 100vh;
  padding: 28rpx 24rpx 40rpx;
  background:
    radial-gradient(circle at top right, rgba(17, 76, 149, 0.1), transparent 28%),
    linear-gradient(180deg, #eff8f1, #e6eef9);
}

.hero {
  padding: 12rpx 4rpx 28rpx;
}

.eyebrow {
  display: inline-flex;
  padding: 12rpx 20rpx;
  border-radius: 999px;
  background: rgba(30, 123, 77, 0.1);
  color: #1e7b4d;
  font-size: 22rpx;
  font-weight: 700;
  margin-bottom: 20rpx;
}

.title {
  display: block;
  font-size: 70rpx;
  line-height: 1.03;
  font-weight: 800;
  color: #07101f;
}

.subtitle {
  display: block;
  margin-top: 18rpx;
  font-size: 28rpx;
  line-height: 1.6;
  color: #475569;
}

.note-panel {
  margin-top: 26rpx;
  padding: 22rpx;
  border-radius: 26rpx;
  background: rgba(255, 255, 255, 0.76);
}

.note-title {
  display: block;
  font-size: 24rpx;
  font-weight: 700;
  color: #0f172a;
}

.note-copy {
  display: block;
  margin-top: 8rpx;
  font-size: 24rpx;
  line-height: 1.55;
  color: #475569;
}
</style>
