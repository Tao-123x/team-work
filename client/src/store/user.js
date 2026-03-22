import { defineStore } from "pinia";
import { login } from "../api/auth";

const STORAGE_KEY = "teamwork-user";

function getStoredUser() {
  try {
    return uni.getStorageSync(STORAGE_KEY) || null;
  } catch {
    return null;
  }
}

function persistUser(user) {
  try {
    if (user) {
      uni.setStorageSync(STORAGE_KEY, user);
      return;
    }

    uni.removeStorageSync(STORAGE_KEY);
  } catch {
    // Ignore storage failures in demo mode.
  }
}

export const useUserStore = defineStore("user", {
  state: () => ({
    currentUser: getStoredUser(),
    loading: false
  }),
  getters: {
    isLoggedIn: (state) => Boolean(state.currentUser?.token)
  },
  actions: {
    async loginWithProfile(profile) {
      this.loading = true;
      try {
        const result = await login(profile);
        this.currentUser = {
          ...profile,
          user_id: result.user_id,
          token: result.token
        };
        persistUser(this.currentUser);
      } finally {
        this.loading = false;
      }
    },
    async registerWithProfile(profile) {
      await this.loginWithProfile(profile);
    },
    logout() {
      this.currentUser = null;
      persistUser(null);
    }
  }
});
