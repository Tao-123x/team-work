<script setup>
import EntryHeroStage from "./EntryHeroStage.vue";

defineProps({
  theme: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(["open"]);
</script>

<template>
  <view class="preview-card">
    <view class="version-badge">{{ theme.name }}</view>
    <view class="card-head">
      <view>
        <text class="demo-name">{{ theme.supportLabel }}</text>
        <text class="demo-headline">{{ theme.headline }}</text>
      </view>
      <view class="tags">
        <text class="tag">{{ theme.campusTag }}</text>
        <text class="tag alt">{{ theme.deliveryTag }}</text>
      </view>
    </view>

    <EntryHeroStage :theme="theme" compact />

    <text class="summary">{{ theme.summary }}</text>

    <view class="scene-strip">
      <view class="scene-pill active">
        <text class="scene-label">Splash</text>
        <text class="scene-copy">Hero-led first screen</text>
      </view>
      <view class="scene-pill">
        <text class="scene-label">Login</text>
        <text class="scene-copy">Faster sign-in path</text>
      </view>
      <view class="scene-pill">
        <text class="scene-label">Register</text>
        <text class="scene-copy">Dorm identity setup</text>
      </view>
    </view>

    <view class="actions">
      <button class="action-btn primary" @click="emit('open', 'splash')">Splash</button>
      <button class="action-btn" @click="emit('open', 'login')">Login</button>
      <button class="action-btn" @click="emit('open', 'register')">Register</button>
    </view>
  </view>
</template>

<style scoped>
.preview-card {
  position: relative;
  background: rgba(255, 255, 255, 0.55);
  backdrop-filter: blur(48rpx);
  -webkit-backdrop-filter: blur(48rpx);
  border: 2rpx solid rgba(255, 255, 255, 0.7);
  border-radius: 48rpx;
  padding: 40rpx;
  box-shadow: 
    0 32rpx 80rpx rgba(0, 0, 0, 0.06),
    inset 0 4rpx 20rpx rgba(255, 255, 255, 0.5);
  margin-bottom: 40rpx;
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease;
}

.version-badge {
  position: absolute;
  top: 24rpx;
  right: 24rpx;
  padding: 10rpx 18rpx;
  border-radius: 999px;
  background: rgba(15, 23, 42, 0.92);
  color: #ffffff;
  font-size: 20rpx;
  font-weight: 800;
  letter-spacing: 1rpx;
}

.card-head {
  display: flex;
  justify-content: space-between;
  gap: 16rpx;
  margin-bottom: 32rpx;
}

.demo-name {
  display: inline-block;
  padding: 8rpx 24rpx;
  border-radius: 999px;
  background: rgba(0, 0, 0, 0.05);
  color: var(--text-strong, #0f172a);
  font-size: 22rpx;
  font-weight: 800;
  margin-bottom: 16rpx;
  text-transform: uppercase;
  letter-spacing: 2rpx;
}

.demo-headline {
  display: block;
  color: var(--text-strong, #0f172a);
  font-size: 56rpx;
  font-weight: 900;
  letter-spacing: -2rpx;
}

.tags {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 12rpx;
}

.tag {
  display: inline-flex;
  padding: 12rpx 20rpx;
  border-radius: 999px;
  background: rgba(30, 123, 77, 0.1);
  color: #1e7b4d;
  font-size: 20rpx;
  font-weight: 800;
}

.tag.alt {
  background: rgba(17, 76, 149, 0.1);
  color: #114c95;
}

.summary {
  display: block;
  margin-top: 32rpx;
  font-size: 28rpx;
  line-height: 1.6;
  font-weight: 500;
  color: #475569;
}

.scene-strip {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14rpx;
  margin-top: 28rpx;
}

.scene-pill {
  padding: 18rpx 18rpx 20rpx;
  border-radius: 24rpx;
  background: rgba(255, 255, 255, 0.52);
  border: 1rpx solid rgba(255, 255, 255, 0.72);
}

.scene-pill.active {
  background: linear-gradient(180deg, rgba(12, 20, 37, 0.94), rgba(25, 159, 86, 0.86));
}

.scene-label {
  display: block;
  font-size: 22rpx;
  font-weight: 800;
  color: #0f172a;
}

.scene-copy {
  display: block;
  margin-top: 6rpx;
  font-size: 20rpx;
  line-height: 1.4;
  color: #64748b;
}

.scene-pill.active .scene-label,
.scene-pill.active .scene-copy {
  color: #ffffff;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 16rpx;
  margin-top: 32rpx;
}

.action-btn {
  flex: 1;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(16rpx);
  color: #0f172a;
  font-size: 26rpx;
  font-weight: 800;
  height: 96rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  border: 2rpx solid rgba(255, 255, 255, 0.9);
  box-shadow: 0 8rpx 20rpx rgba(0, 0, 0, 0.04);
}

.action-btn:active {
  transform: scale(0.96);
  background: rgba(255, 255, 255, 1);
}

.primary {
  background: #0f172a;
  color: #ffffff;
  border: none;
  box-shadow: 0 16rpx 32rpx rgba(15, 23, 42, 0.25);
}

.primary:active {
  background: #1e293b;
  box-shadow: 0 8rpx 16rpx rgba(15, 23, 42, 0.15);
}
</style>
