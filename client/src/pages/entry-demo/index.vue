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
      <text class="title">Choose the dorm entry direction that feels presentation-ready.</text>
      <text class="subtitle">
        Three concepts for splash, login, and register. All keep the same field model, but each
        changes the first-screen rhythm, hierarchy, and campus expression.
      </text>

      <view class="hero-grid">
        <view class="hero-panel strong">
          <text class="panel-label">Current goal</text>
          <text class="panel-title">Show three distinct UI versions, then keep one as the real path.</text>
          <text class="panel-copy">
            This page works as the iteration board for teachers: it makes the visual differences,
            motion choices, and product direction easy to compare.
          </text>
        </view>

        <view class="hero-panel stats">
          <view class="stat-row">
            <text class="stat-value">3</text>
            <text class="stat-copy">entry demos kept as evidence of iteration</text>
          </view>
          <view class="stat-row">
            <text class="stat-value">1</text>
            <text class="stat-copy">selected direction to carry into the real app</text>
          </view>
        </view>
      </view>

      <view class="note-panel">
        <text class="note-title">What to say while showing this page</text>
        <text class="note-copy">
          We kept all three versions in GitHub to show visual iteration, rather than deleting the early drafts and hiding the design process.
        </text>
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
  padding: 48rpx 32rpx 64rpx;
  background: 
    radial-gradient(circle at top right, rgba(17, 76, 149, 0.15), transparent 45%),
    radial-gradient(circle at bottom left, rgba(25, 159, 86, 0.15), transparent 45%),
    linear-gradient(180deg, #f0fdf6, #e8f0fe);
}

.hero {
  padding: 16rpx 8rpx 40rpx;
}

.eyebrow {
  display: inline-block;
  padding: 12rpx 24rpx;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.8);
  color: #0f172a;
  font-size: 20rpx;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 2rpx;
  margin-bottom: 24rpx;
  box-shadow: 0 12rpx 24rpx rgba(0, 0, 0, 0.04);
}

.title {
  display: block;
  font-size: 84rpx;
  line-height: 0.95;
  font-weight: 900;
  color: #07101f;
  letter-spacing: -3rpx;
}

.subtitle {
  display: block;
  margin-top: 24rpx;
  font-size: 30rpx;
  line-height: 1.5;
  color: #475569;
  font-weight: 500;
}

.hero-grid {
  display: grid;
  grid-template-columns: 1.3fr 1fr;
  gap: 18rpx;
  margin-top: 34rpx;
}

.hero-panel {
  padding: 30rpx;
  border-radius: 30rpx;
  background: rgba(255, 255, 255, 0.52);
  backdrop-filter: blur(22rpx);
  -webkit-backdrop-filter: blur(22rpx);
  border: 1rpx solid rgba(255, 255, 255, 0.85);
  box-shadow: 0 18rpx 36rpx rgba(15, 23, 42, 0.05);
}

.hero-panel.strong {
  background: linear-gradient(180deg, rgba(8, 17, 31, 0.92), rgba(17, 76, 149, 0.88));
}

.panel-label {
  display: block;
  font-size: 20rpx;
  font-weight: 800;
  letter-spacing: 2rpx;
  text-transform: uppercase;
  color: rgba(15, 23, 42, 0.54);
}

.panel-title {
  display: block;
  margin-top: 12rpx;
  font-size: 36rpx;
  line-height: 1.18;
  font-weight: 900;
  color: #0f172a;
}

.panel-copy {
  display: block;
  margin-top: 14rpx;
  font-size: 24rpx;
  line-height: 1.6;
  color: #5b6677;
}

.hero-panel.strong .panel-label,
.hero-panel.strong .panel-copy {
  color: rgba(255, 255, 255, 0.76);
}

.hero-panel.strong .panel-title {
  color: #ffffff;
}

.stats {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 16rpx;
}

.stat-row {
  padding: 10rpx 0;
}

.stat-value {
  display: block;
  font-size: 72rpx;
  line-height: 0.95;
  font-weight: 900;
  color: #08111f;
}

.stat-copy {
  display: block;
  margin-top: 10rpx;
  font-size: 24rpx;
  line-height: 1.45;
  color: #526072;
  font-weight: 600;
}

.note-panel {
  margin-top: 40rpx;
  padding: 32rpx;
  border-radius: 32rpx;
  background: rgba(255, 255, 255, 0.55);
  backdrop-filter: blur(24rpx);
  -webkit-backdrop-filter: blur(24rpx);
  border: 1rpx solid rgba(255, 255, 255, 0.8);
  box-shadow: 
    0 16rpx 40rpx rgba(15, 23, 42, 0.04),
    inset 0 2rpx 0 rgba(255, 255, 255, 0.9);
}

.note-title {
  display: block;
  font-size: 26rpx;
  font-weight: 800;
  color: #0f172a;
}

.note-copy {
  display: block;
  margin-top: 12rpx;
  font-size: 26rpx;
  line-height: 1.6;
  color: #475569;
  font-weight: 500;
}
</style>
