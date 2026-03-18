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
  margin-bottom: 20rpx;
}

.form-title {
  display: block;
  font-size: 40rpx;
  font-weight: 800;
  color: #0f172a;
}

.form-copy {
  display: block;
  margin-top: 10rpx;
  font-size: 24rpx;
  color: #526072;
  line-height: 1.55;
}

.field {
  margin-bottom: 18rpx;
}

.label {
  display: block;
  margin-bottom: 10rpx;
  font-size: 22rpx;
  font-weight: 700;
  color: #334155;
}

.input {
  width: 100%;
  height: 96rpx;
  border-radius: 24rpx;
  background: rgba(248, 250, 252, 0.96);
  padding: 0 24rpx;
  font-size: 28rpx;
  box-shadow: inset 0 0 0 2rpx rgba(15, 23, 42, 0.04);
}

.primary-btn,
.quick-btn {
  border-radius: 999px;
  font-size: 26rpx;
  font-weight: 700;
}

.primary-btn {
  margin-top: 8rpx;
  background: #111111;
  color: #ffffff;
}

.quick-btn {
  margin-top: 14rpx;
  background: rgba(17, 76, 149, 0.09);
  color: #114c95;
}

.footer-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20rpx;
}

.footer-copy {
  color: #64748b;
  font-size: 22rpx;
}

.footer-link {
  color: #1e7b4d;
  font-size: 22rpx;
  font-weight: 700;
}
</style>
