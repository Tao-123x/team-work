<script setup>
const iterations = [
  {
    id: "v1",
    label: "Iteration 1",
    title: "Rough",
    tone: "Basic structure first",
    note: "Low-fidelity direction for quick discussion. Focus on layout, CTA position, and minimum login fields.",
    shellClass: "rough-shell",
    topChip: "Dorm help",
    heroTitle: "Sign in for dorm pickup.",
    heroCopy: "Simple structure, weak branding, fast to evaluate.",
    cardClass: "rough-card",
    inputClass: "rough-input",
    primaryClass: "rough-button",
    secondaryClass: "rough-secondary"
  },
  {
    id: "v2",
    label: "Iteration 2",
    title: "Refined",
    tone: "Campus direction added",
    note: "Mid-fidelity version. Brings in Hubei green, stronger section hierarchy, and a cleaner delivery-app CTA.",
    shellClass: "mid-shell",
    topChip: "Campus access",
    heroTitle: "Move a request in seconds.",
    heroCopy: "Adds color balance, card rhythm, and stronger visual trust.",
    cardClass: "mid-card",
    inputClass: "mid-input",
    primaryClass: "mid-button",
    secondaryClass: "mid-secondary"
  },
  {
    id: "v3",
    label: "Iteration 3",
    title: "Polished",
    tone: "Demo B chosen direction",
    note: "High-fidelity concept based on the selected Demo B. Strong card stack hero, clearer product feel, and presentation-ready motion style.",
    shellClass: "polished-shell",
    topChip: "MMU x Hubei",
    heroTitle: "A stronger first-screen CTA.",
    heroCopy: "This is the version to move forward into the real login and register flow.",
    cardClass: "polished-card",
    inputClass: "polished-input",
    primaryClass: "polished-button",
    secondaryClass: "polished-secondary"
  }
];
</script>

<template>
  <view class="page">
    <view class="header">
      <text class="eyebrow">Entry UI iteration board</text>
      <text class="title">From quick draft to presentation-ready UI.</text>
      <text class="subtitle">
        The same login flow evolves across three levels so your team can show a clear design
        iteration story in class.
      </text>
    </view>

    <view class="iteration-list">
      <view v-for="item in iterations" :key="item.id" class="iteration-section">
        <view class="meta">
          <view>
            <text class="meta-label">{{ item.label }}</text>
            <text class="meta-title">{{ item.title }}</text>
          </view>
          <text class="meta-tone">{{ item.tone }}</text>
        </view>

        <view class="showcase-row">
          <view class="phone-frame">
            <view class="phone-screen" :class="item.shellClass">
              <view class="status-bar">
                <view class="status-pill">{{ item.topChip }}</view>
                <view class="status-dot" />
              </view>

              <view class="hero-block">
                <view class="hero-visual" :class="item.id">
                  <template v-if="item.id === 'v1'">
                    <view class="wire-bell" />
                  </template>
                  <template v-else-if="item.id === 'v2'">
                    <view class="mid-bell">
                      <view class="mid-clock" />
                    </view>
                  </template>
                  <template v-else>
                    <view class="polished-stack">
                      <view class="stack-card back" />
                      <view class="stack-card middle" />
                      <view class="stack-card front">
                        <view class="front-chip">Dorm A</view>
                        <view class="front-title">Takeaway shelf</view>
                        <view class="front-line short" />
                        <view class="front-line" />
                        <view class="front-footer">
                          <view class="front-fee">¥2.00</view>
                          <view class="front-badge">Fast pick-up</view>
                        </view>
                      </view>
                    </view>
                  </template>
                </view>

                <text class="hero-title">{{ item.heroTitle }}</text>
                <text class="hero-copy">{{ item.heroCopy }}</text>
              </view>

              <view class="login-card" :class="item.cardClass">
                <text class="card-title">Student login</text>
                <text class="card-copy">Student ID and password only.</text>

                <view class="field-group">
                  <text class="field-label">Student ID</text>
                  <view class="field-box" :class="item.inputClass">2026xxxx</view>
                </view>
                <view class="field-group">
                  <text class="field-label">Password</text>
                  <view class="field-box" :class="item.inputClass">........</view>
                </view>

                <view class="primary-cta" :class="item.primaryClass">Sign in</view>
                <view class="secondary-cta" :class="item.secondaryClass">Register now</view>
              </view>
            </view>
          </view>

          <view class="iteration-note">
            <text class="note-title">{{ item.title }} takeaway</text>
            <text class="note-body">{{ item.note }}</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<style scoped>
.page {
  min-height: 100vh;
  padding: 28rpx 24rpx 48rpx;
  background:
    radial-gradient(circle at top left, rgba(25, 159, 86, 0.1), transparent 25%),
    linear-gradient(180deg, #f4faf5, #e8eef9);
}

.header {
  margin-bottom: 28rpx;
}

.eyebrow {
  display: inline-flex;
  padding: 10rpx 18rpx;
  border-radius: 999px;
  background: rgba(25, 159, 86, 0.12);
  color: #199f56;
  font-size: 22rpx;
  font-weight: 700;
  margin-bottom: 18rpx;
}

.title {
  display: block;
  font-size: 68rpx;
  line-height: 1.02;
  font-weight: 800;
  color: #08111f;
}

.subtitle {
  display: block;
  margin-top: 18rpx;
  font-size: 28rpx;
  line-height: 1.58;
  color: #526072;
  max-width: 92%;
}

.iteration-section {
  margin-bottom: 32rpx;
  padding: 28rpx;
  border-radius: 34rpx;
  background: rgba(255, 255, 255, 0.84);
  box-shadow: 0 20rpx 48rpx rgba(15, 23, 42, 0.08);
}

.meta {
  display: flex;
  justify-content: space-between;
  gap: 16rpx;
  align-items: flex-start;
  margin-bottom: 22rpx;
}

.meta-label {
  display: block;
  font-size: 22rpx;
  font-weight: 700;
  color: #199f56;
  margin-bottom: 8rpx;
}

.meta-title {
  display: block;
  font-size: 42rpx;
  font-weight: 800;
  color: #08111f;
}

.meta-tone {
  padding: 10rpx 18rpx;
  border-radius: 999px;
  background: rgba(10, 78, 189, 0.08);
  color: #0a4ebd;
  font-size: 22rpx;
  font-weight: 700;
}

.showcase-row {
  display: flex;
  gap: 22rpx;
  align-items: stretch;
}

.phone-frame {
  width: 390rpx;
  min-width: 390rpx;
  padding: 14rpx;
  border-radius: 42rpx;
  background: #0b1020;
  box-shadow: 0 24rpx 50rpx rgba(15, 23, 42, 0.14);
}

.phone-screen {
  min-height: 760rpx;
  border-radius: 30rpx;
  padding: 20rpx;
  overflow: hidden;
}

.rough-shell {
  background: linear-gradient(180deg, #f7f7f7, #ececec);
}

.mid-shell {
  background: linear-gradient(180deg, #eef7f1, #dff0e6);
}

.polished-shell {
  background: linear-gradient(180deg, #eef7f1, #d5e8ff);
}

.status-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 18rpx;
}

.status-pill {
  padding: 8rpx 16rpx;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.7);
  color: #0f172a;
  font-size: 20rpx;
  font-weight: 700;
}

.status-dot {
  width: 18rpx;
  height: 18rpx;
  border-radius: 999px;
  background: #111827;
}

.hero-block {
  margin-bottom: 18rpx;
}

.hero-visual {
  height: 230rpx;
  border-radius: 28rpx;
  position: relative;
  margin-bottom: 18rpx;
}

.hero-visual.v1 {
  background: linear-gradient(180deg, rgba(255,255,255,0.6), rgba(229,231,235,0.9));
  border: 2rpx dashed rgba(15, 23, 42, 0.18);
}

.hero-visual.v2 {
  background: linear-gradient(180deg, rgba(157,228,180,0.18), rgba(10,78,189,0.1));
}

.hero-visual.v3 {
  background: linear-gradient(180deg, rgba(157,228,180,0.18), rgba(10,78,189,0.08));
}

.wire-bell {
  position: absolute;
  left: 50%;
  top: 44rpx;
  transform: translateX(-50%);
  width: 120rpx;
  height: 130rpx;
  border: 4rpx solid rgba(15, 23, 42, 0.28);
  border-radius: 24rpx 24rpx 18rpx 18rpx;
}

.wire-bell::before {
  content: "";
  position: absolute;
  width: 52rpx;
  height: 24rpx;
  border: 4rpx solid rgba(15, 23, 42, 0.28);
  border-bottom: 0;
  border-radius: 24rpx 24rpx 0 0;
  left: 50%;
  top: -26rpx;
  transform: translateX(-50%);
}

.wire-bell::after {
  content: "";
  position: absolute;
  width: 90rpx;
  height: 10rpx;
  border-radius: 999px;
  background: rgba(15, 23, 42, 0.2);
  left: 50%;
  bottom: -18rpx;
  transform: translateX(-50%);
}

.mid-bell {
  position: absolute;
  left: 50%;
  top: 34rpx;
  transform: translateX(-50%);
  width: 146rpx;
  height: 156rpx;
  border-radius: 24rpx;
  background: linear-gradient(180deg, #9de4b4, #199f56);
  clip-path: polygon(22% 0%, 78% 0%, 92% 100%, 8% 100%);
}

.mid-bell::before {
  content: "";
  position: absolute;
  width: 58rpx;
  height: 28rpx;
  left: 50%;
  top: -18rpx;
  transform: translateX(-50%);
  border-radius: 24rpx 24rpx 0 0;
  background: #199f56;
}

.mid-clock {
  position: absolute;
  width: 64rpx;
  height: 64rpx;
  border-radius: 999px;
  border: 6rpx solid rgba(255, 255, 255, 0.76);
  left: 50%;
  top: 38rpx;
  transform: translateX(-50%);
}

.mid-clock::before,
.mid-clock::after {
  content: "";
  position: absolute;
  left: 50%;
  top: 50%;
  background: #ffffff;
  border-radius: 999px;
  transform-origin: bottom center;
}

.mid-clock::before {
  width: 5rpx;
  height: 18rpx;
  transform: translate(-50%, -100%) rotate(12deg);
}

.mid-clock::after {
  width: 5rpx;
  height: 26rpx;
  transform: translate(-50%, -100%) rotate(88deg);
}

.polished-stack {
  position: absolute;
  left: 50%;
  top: 26rpx;
  width: 260rpx;
  height: 178rpx;
  transform: translateX(-50%);
}

.stack-card {
  position: absolute;
  inset: 0;
  border-radius: 24rpx;
  box-shadow: 0 18rpx 36rpx rgba(15, 23, 42, 0.08);
}

.stack-card.back {
  background: rgba(157, 228, 180, 0.58);
  transform: translate(-18rpx, 14rpx) rotate(-8deg);
}

.stack-card.middle {
  background: rgba(10, 78, 189, 0.14);
  transform: translate(14rpx, -8rpx) rotate(6deg);
}

.stack-card.front {
  background: rgba(255, 255, 255, 0.96);
  padding: 20rpx;
}

.front-chip {
  display: inline-flex;
  padding: 8rpx 14rpx;
  border-radius: 999px;
  background: rgba(25, 159, 86, 0.12);
  color: #199f56;
  font-size: 18rpx;
  font-weight: 700;
}

.front-title {
  margin-top: 14rpx;
  font-size: 28rpx;
  font-weight: 800;
  color: #08111f;
}

.front-line {
  margin-top: 12rpx;
  height: 12rpx;
  border-radius: 999px;
  background: rgba(15, 23, 42, 0.08);
}

.front-line.short {
  width: 54%;
}

.front-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 18rpx;
}

.front-fee,
.front-badge {
  padding: 8rpx 14rpx;
  border-radius: 999px;
  font-size: 18rpx;
  font-weight: 700;
}

.front-fee {
  background: #111111;
  color: #ffffff;
}

.front-badge {
  background: rgba(10, 78, 189, 0.1);
  color: #0a4ebd;
}

.hero-title {
  display: block;
  font-size: 36rpx;
  line-height: 1.08;
  font-weight: 800;
  color: #08111f;
}

.hero-copy {
  display: block;
  margin-top: 12rpx;
  font-size: 22rpx;
  line-height: 1.5;
  color: #5a6778;
}

.login-card {
  padding: 22rpx;
  border-radius: 28rpx;
}

.rough-card {
  background: rgba(255,255,255,0.88);
  border: 2rpx solid rgba(15, 23, 42, 0.08);
}

.mid-card {
  background: rgba(255,255,255,0.92);
  box-shadow: 0 16rpx 36rpx rgba(15, 23, 42, 0.05);
}

.polished-card {
  background: rgba(255,255,255,0.95);
  box-shadow: 0 20rpx 40rpx rgba(15, 23, 42, 0.08);
}

.card-title {
  display: block;
  font-size: 28rpx;
  font-weight: 800;
  color: #08111f;
}

.card-copy {
  display: block;
  margin-top: 8rpx;
  font-size: 20rpx;
  color: #6b7280;
  margin-bottom: 16rpx;
}

.field-group {
  margin-bottom: 14rpx;
}

.field-label {
  display: block;
  margin-bottom: 8rpx;
  font-size: 18rpx;
  font-weight: 700;
  color: #475569;
}

.field-box {
  height: 76rpx;
  border-radius: 18rpx;
  display: flex;
  align-items: center;
  padding: 0 18rpx;
  font-size: 24rpx;
}

.rough-input {
  background: #f2f2f2;
  color: #6b7280;
}

.mid-input {
  background: #f8fbf9;
  color: #475569;
  box-shadow: inset 0 0 0 2rpx rgba(25, 159, 86, 0.06);
}

.polished-input {
  background: #f8fafc;
  color: #334155;
  box-shadow: inset 0 0 0 2rpx rgba(15, 23, 42, 0.04);
}

.primary-cta,
.secondary-cta {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 999px;
  font-size: 24rpx;
  font-weight: 700;
}

.primary-cta {
  height: 80rpx;
  margin-top: 8rpx;
}

.secondary-cta {
  height: 72rpx;
  margin-top: 12rpx;
}

.rough-button {
  background: #111111;
  color: #ffffff;
}

.rough-secondary {
  background: rgba(15, 23, 42, 0.06);
  color: #111111;
}

.mid-button {
  background: #199f56;
  color: #ffffff;
}

.mid-secondary {
  background: rgba(25, 159, 86, 0.1);
  color: #199f56;
}

.polished-button {
  background: #111111;
  color: #ffffff;
}

.polished-secondary {
  background: rgba(10, 78, 189, 0.08);
  color: #0a4ebd;
}

.iteration-note {
  flex: 1;
  padding: 22rpx;
  border-radius: 28rpx;
  background: rgba(244, 247, 251, 0.88);
}

.note-title {
  display: block;
  font-size: 28rpx;
  font-weight: 800;
  color: #08111f;
}

.note-body {
  display: block;
  margin-top: 12rpx;
  font-size: 24rpx;
  line-height: 1.6;
  color: #526072;
}
</style>
