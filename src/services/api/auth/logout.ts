import useAuthStore from "@/stores/auth.store";

export const logoutAPI = async () => {
  // Clear role and token
  useAuthStore.setState({ role: "", token: "" });
};
