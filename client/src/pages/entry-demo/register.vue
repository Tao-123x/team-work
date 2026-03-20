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
  nickname: "",
  dormBuilding: "",
  floorNo: "",
  roomNo: "",
  password: ""
});
</script>

<template>
  <EntryScreenShell
    :theme="theme"
    :eyebrow="theme.register.eyebrow"
    :title="theme.register.title"
    :subtitle="theme.register.subtitle"
  >
    <template #hero>
      <EntryHeroStage :theme="theme" compact />
    </template>

    <view class="form-card">
      <view class="intro-panel">
        <text class="intro-label">Registration intent</text>
        <text class="intro-copy">{{ theme.register.highlight }}</text>
      </view>

      <view class="field">
        <text class="label">Student ID</text>
        <input v-model="form.studentId" class="input" placeholder="2026xxxx" />
      </view>
      <view class="field">
        <text class="label">Nickname</text>
        <input v-model="form.nickname" class="input" placeholder="Campus name" />
      </view>
      <view class="field">
        <text class="label">Dorm building</text>
        <input v-model="form.dormBuilding" class="input" placeholder="Dorm A / Dorm B" />
      </view>

      <view class="grid-row">
        <view class="field half">
          <text class="label">Floor</text>
          <input v-model="form.floorNo" class="input" placeholder="6" />
        </view>
        <view class="field half">
          <text class="label">Room</text>
          <input v-model="form.roomNo" class="input" placeholder="602" />
        </view>
      </view>

      <view class="field">
        <text class="label">Password</text>
        <input v-model="form.password" class="input" password placeholder="Set a password" />
      </view>

      <button class="primary-btn">Create dorm account</button>
      <text class="footnote">This is a visual prototype. Real account logic stays unchanged in this round.</text>
    </view>
  </EntryScreenShell>
</template>

<style scoped>
.form-card {
  display: flex;
  flex-direction: column;
}

.intro-panel {
  margin-bottom: 28rpx;
  padding: 24rpx 26rpx;
  border-radius: 28rpx;
  background: linear-gradient(180deg, rgba(10, 17, 31, 0.88), rgba(17, 76, 149, 0.82));
  box-shadow: 0 24rpx 52rpx rgba(15, 23, 42, 0.15);
}

.intro-label {
  display: block;
  font-size: 20rpx;
  font-weight: 800;
  letter-spacing: 2rpx;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.66);
}

.intro-copy {
  display: block;
  margin-top: 12rpx;
  font-size: 24rpx;
  line-height: 1.55;
  font-weight: 700;
  color: #ffffff;
}

.field {
  margin-bottom: 24rpx;
}

.grid-row {
  display: flex;
  gap: 24rpx;
}

.half {
  flex: 1;
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

.primary-btn {
  margin-top: 32rpx;
  border-radius: 40rpx;
  background: var(--text-strong);
  color: var(--panel);
  font-size: 32rpx;
  font-weight: 900;
  height: 112rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 32rpx 64rpx rgba(0, 0, 0, 0.2);
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.primary-btn:active {
  transform: scale(0.96) translateY(8rpx);
  box-shadow: 0 12rpx 24rpx rgba(0, 0, 0, 0.15);
}

.footnote {
  display: block;
  margin-top: 32rpx;
  font-size: 24rpx;
  line-height: 1.5;
  color: var(--text-muted);
  text-align: center;
}
</style>
