<script setup>
import { computed, reactive, ref } from "vue";
import { onLoad } from "@dcloudio/uni-app";
import EntryHeroStage from "../../components/entry-demo/EntryHeroStage.vue";
import EntryScreenShell from "../../components/entry-demo/EntryScreenShell.vue";
import { getEntryTheme } from "../../utils/entryThemes";

const themeId = ref("bell");
onLoad((query) => {
  themeId.value = query?.theme || "bell";
});

const theme = computed(() => getEntryTheme(themeId.value));
const form = reactive({
  studentId: "",
  password: ""
});

function goToRegister() {
  uni.navigateTo({
    url: `/pages/entry-demo/register?theme=${theme.value.id}`
  });
}
</script>

<template>
  <EntryScreenShell
    :theme="theme"
    :eyebrow="theme.login.eyebrow"
    :title="theme.login.title"
    :subtitle="theme.login.subtitle"
  >
    <template #hero>
      <EntryHeroStage :theme="theme" compact />
    </template>

    <view class="form-card">
      <view class="form-head">
        <text class="form-title">Student login</text>
        <text class="form-copy">Designed for bold first-screen focus and quick action.</text>
      </view>

      <view class="info-ribbon">
        <text class="ribbon-label">Why this version works</text>
        <text class="ribbon-copy">{{ theme.login.highlight }}</text>
      </view>

      <view class="field">
        <text class="label">Student ID</text>
        <input v-model="form.studentId" class="input" placeholder="2026xxxx" />
      </view>

      <view class="field">
        <text class="label">Password</text>
        <input v-model="form.password" class="input" password placeholder="Enter your password" />
      </view>

      <button class="primary-btn">Sign in</button>
      <button class="quick-btn">Quick campus demo</button>

      <view class="footer-row">
        <text class="footer-copy">Need a dorm account?</text>
        <text class="footer-link" @click="goToRegister">Register now</text>
      </view>
    </view>
  </EntryScreenShell>
</template>

<style scoped>
.form-card {
  display: flex;
  flex-direction: column;
}

.form-head {
  margin-bottom: 40rpx;
}

.info-ribbon {
  margin-bottom: 26rpx;
  padding: 24rpx 26rpx;
  border-radius: 28rpx;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.74), rgba(255, 255, 255, 0.42));
  border: 1rpx solid rgba(255, 255, 255, 0.82);
}

.ribbon-label {
  display: block;
  font-size: 20rpx;
  letter-spacing: 2rpx;
  text-transform: uppercase;
  font-weight: 800;
  color: #64748b;
}

.ribbon-copy {
  display: block;
  margin-top: 10rpx;
  font-size: 24rpx;
  line-height: 1.55;
  color: var(--text-strong);
  font-weight: 700;
}

.form-title {
  display: block;
  font-size: 56rpx;
  font-weight: 900;
  letter-spacing: -2rpx;
  color: var(--text-strong);
}

.form-copy {
  display: block;
  margin-top: 16rpx;
  font-size: 28rpx;
  color: var(--text-muted);
  line-height: 1.5;
}

.field {
  margin-bottom: 24rpx;
}

.label {
  display: block;
  margin: 0 0 10rpx 8rpx;
  font-size: 22rpx;
  font-weight: 800;
  letter-spacing: 1rpx;
  color: rgba(15, 23, 42, 0.62);
}

.input {
  width: 100%;
  height: 112rpx;
  border-radius: 36rpx;
  background: rgba(255, 255, 255, 0.45);
  backdrop-filter: blur(48rpx);
  -webkit-backdrop-filter: blur(48rpx);
  border: 2rpx solid rgba(255, 255, 255, 0.6);
  padding: 0 40rpx;
  font-size: 32rpx;
  font-weight: 600;
  box-shadow: 
    0 24rpx 60rpx rgba(0, 0, 0, 0.04),
    inset 0 4rpx 10rpx rgba(255, 255, 255, 0.5);
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  color: var(--text-strong);
}

.input:focus-within {
  background: rgba(255, 255, 255, 0.85);
  border-color: rgba(255, 255, 255, 1);
  transform: translateY(-4rpx) scale(1.02);
  box-shadow: 0 40rpx 80rpx rgba(15, 23, 42, 0.08);
}

.primary-btn,
.quick-btn {
  border-radius: 40rpx;
  font-size: 32rpx;
  font-weight: 900;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  height: 112rpx;
}

.primary-btn {
  margin-top: 32rpx;
  background: var(--text-strong);
  color: var(--panel);
  box-shadow: 0 32rpx 64rpx rgba(0, 0, 0, 0.2);
}

.primary-btn:active {
  transform: scale(0.96) translateY(8rpx);
  box-shadow: 0 12rpx 24rpx rgba(0, 0, 0, 0.15);
}

.quick-btn {
  margin-top: 24rpx;
  background: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(32rpx);
  border: 2rpx solid rgba(255, 255, 255, 0.6);
  color: var(--text-strong);
  box-shadow: 0 16rpx 40rpx rgba(0, 0, 0, 0.05);
}

.quick-btn:active {
  transform: scale(0.96);
  background: rgba(255, 255, 255, 0.8);
}

.footer-row {
  display: flex;
  justify-content: center;
  gap: 16rpx;
  align-items: center;
  margin-top: 48rpx;
}

.footer-copy {
  color: var(--text-muted);
  font-size: 26rpx;
  font-weight: 500;
}

.footer-link {
  color: var(--text-strong);
  font-size: 26rpx;
  font-weight: 800;
  text-decoration: underline;
}
</style>
