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
    <view class="card-head">
      <view>
        <text class="demo-name">{{ theme.name }}</text>
        <text class="demo-headline">{{ theme.headline }}</text>
      </view>
      <view class="tags">
        <text class="tag">{{ theme.campusTag }}</text>
        <text class="tag alt">{{ theme.deliveryTag }}</text>
      </view>
    </view>

    <EntryHeroStage :theme="theme" compact />

    <text class="summary">{{ theme.summary }}</text>

    <view class="actions">
      <button class="action-btn primary" @click="emit('open', 'splash')">Splash</button>
      <button class="action-btn" @click="emit('open', 'login')">Login</button>
      <button class="action-btn" @click="emit('open', 'register')">Register</button>
    </view>
  </view>
</template>

<style scoped>
.preview-card {
  background: rgba(255, 255, 255, 0.88);
  border-radius: 34rpx;
  padding: 28rpx;
  box-shadow: 0 18rpx 40rpx rgba(15, 23, 42, 0.08);
  margin-bottom: 24rpx;
}

.card-head {
  display: flex;
  justify-content: space-between;
  gap: 16rpx;
  margin-bottom: 20rpx;
}

.demo-name {
  display: block;
  color: #1e7b4d;
  font-size: 22rpx;
  font-weight: 700;
  margin-bottom: 8rpx;
}

.demo-headline {
  display: block;
  color: #0f172a;
  font-size: 40rpx;
  font-weight: 800;
}

.tags {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 10rpx;
}

.tag {
  display: inline-flex;
  padding: 10rpx 18rpx;
  border-radius: 999px;
  background: rgba(30, 123, 77, 0.1);
  color: #1e7b4d;
  font-size: 20rpx;
  font-weight: 700;
}

.tag.alt {
  background: rgba(17, 76, 149, 0.1);
  color: #114c95;
}

.summary {
  display: block;
  margin-top: 20rpx;
  font-size: 26rpx;
  line-height: 1.58;
  color: #475569;
}

.actions {
  display: flex;
  gap: 14rpx;
  margin-top: 22rpx;
}

.action-btn {
  flex: 1;
  border-radius: 999px;
  background: #f1f5f9;
  color: #0f172a;
  font-size: 24rpx;
  font-weight: 700;
}

.primary {
  background: #111111;
  color: #ffffff;
}
</style>
