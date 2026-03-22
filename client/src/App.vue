<template>
  <view />
</template>

<style>
:root {
  --bg-cream: #f7f4ea;
  --bg-mint: #edf6ef;
  --bg-green: #e4f0e7;
  --surface: rgba(255, 250, 244, 0.74);
  --surface-strong: rgba(255, 255, 255, 0.86);
  --surface-dark: #152033;
  --ink-strong: #172033;
  --ink-muted: #5f6980;
  --line-soft: rgba(23, 32, 51, 0.08);
  --accent-green: #1f8f58;
  --accent-gold: #d69a2d;
  --shadow-soft: 0 18rpx 48rpx rgba(24, 37, 58, 0.08);
  --shadow-deep: 0 28rpx 70rpx rgba(24, 37, 58, 0.14);
  --radius-panel: 34rpx;
  --radius-card: 28rpx;
}

page {
  background:
    radial-gradient(circle at top left, rgba(214, 154, 45, 0.1), transparent 28%),
    radial-gradient(circle at top right, rgba(47, 143, 90, 0.08), transparent 32%),
    radial-gradient(circle at bottom left, rgba(31, 143, 88, 0.09), transparent 28%),
    linear-gradient(180deg, var(--bg-cream), var(--bg-mint) 54%, var(--bg-green));
  color: var(--ink-strong);
  font-family: "Avenir Next", "Trebuchet MS", sans-serif;
}

view,
text,
button,
input,
textarea,
picker {
  box-sizing: border-box;
}

button {
  border: none;
}

button::after {
  border: none;
}

input,
textarea {
  color: var(--ink-strong);
}
</style>
