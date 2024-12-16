import { API_URLS } from "@/config/api-urls";
import axios from "axios";
import useAuthStore from "@/stores/auth.store";

export const getCurrentUserInfo = async (): Promise<UserInfo> => {
  const token = useAuthStore.getState().token;

  if (!token) {
    throw new Error(
      "Token is missing. Please ensure the user is authenticated."
    );
  }

  return axios
    .get(API_URLS.auth.me, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data);
};

export const isLoggedIn = async (): Promise<boolean> => {
  try {
    await getCurrentUserInfo();
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};
