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

.field {
  margin-bottom: 16rpx;
}

.grid-row {
  display: flex;
  gap: 14rpx;
}

.half {
  flex: 1;
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
  height: 92rpx;
  border-radius: 24rpx;
  background: rgba(248, 250, 252, 0.96);
  padding: 0 24rpx;
  font-size: 28rpx;
  box-shadow: inset 0 0 0 2rpx rgba(15, 23, 42, 0.04);
}

.primary-btn {
  margin-top: 10rpx;
  border-radius: 999px;
  background: #111111;
  color: #ffffff;
  font-size: 26rpx;
  font-weight: 700;
}

.footnote {
  display: block;
  margin-top: 18rpx;
  font-size: 22rpx;
  line-height: 1.55;
  color: #64748b;
}
</style>
