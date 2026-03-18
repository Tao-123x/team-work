import { defineStore } from "pinia";
import { login } from "../api/auth";

const DEMO_USER = {
  user_id: 1,
  student_id: "20260001",
  nickname: "Demo User",
  dorm_building: "Dorm A",
  floor_no: "6",
  room_no: "602",
  token: "local-demo-token"
};

export const useUserStore = defineStore("user", {
  state: () => ({
    currentUser: DEMO_USER,
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
      } finally {
        this.loading = false;
      }
    }
  }
});
