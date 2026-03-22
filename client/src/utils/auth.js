export function ensureLoggedIn(userStore) {
  if (userStore?.isLoggedIn) {
    return true;
  }

  uni.redirectTo({
    url: "/pages/auth/login"
  });
  return false;
}
