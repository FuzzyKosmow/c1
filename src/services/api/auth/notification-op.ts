import { API_URLS } from "@/config/api-urls";
import axios from "axios";
import useAuthStore from "@/stores/auth.store";
import { getCurrentUserInfo } from "./getCurrentUserInfo";
export const fetchUserNoti = async (): Promise<UserNotification[]> => {
  const token = useAuthStore.getState().token;

  if (!token) {
    throw new Error(
      "Token is missing. Please ensure the user is authenticated."
    );
  }

  const curUser = await getCurrentUserInfo();
  if (!curUser) {
    throw new Error("User not found");
  }
  const userId = curUser.id;

  return axios
    .get(API_URLS.auth.fetchNoti.replace("{userId}", userId), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data);
};

export const readNoti = async (notiId: string): Promise<UserNotification> => {
  const token = useAuthStore.getState().token;

  if (!token) {
    throw new Error(
      "Token is missing. Please ensure the user is authenticated."
    );
  }
  return axios
    .patch(
      API_URLS.auth.readNoti + notiId,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((res) => res.data);
};

export const readAllNoti = async (): Promise<UserNotification[]> => {
  const token = useAuthStore.getState().token;

  if (!token) {
    throw new Error(
      "Token is missing. Please ensure the user is authenticated."
    );
  }
  const curUser = await getCurrentUserInfo();
  if (!curUser) {
    throw new Error("User not found");
  }
  const userId = curUser.id;

  return axios
    .patch(
      API_URLS.auth.readAllNoti.replace("{userId}", userId),
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((res) => res.data);
};
