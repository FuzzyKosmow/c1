import { API_URLS } from "@/config/api-urls";
import axios from "axios";
import useAuthStore from "@/stores/auth.store";

export const getOrdersFromCurrentUser = async (): Promise<Order[]> => {
  const token = useAuthStore.getState().token;

  if (!token) {
    throw new Error(
      "Token is missing. Please ensure the user is authenticated."
    );
  }

  return axios
    .get(API_URLS.auth.getOrder, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data);
};
