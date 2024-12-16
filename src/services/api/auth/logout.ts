import useAuthStore from "@/stores/auth.store";

export const logoutAPI = async () => {
  // clear token
  useAuthStore.getState().clearToken();
};
