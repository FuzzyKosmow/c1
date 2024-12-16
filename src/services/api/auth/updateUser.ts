import { API_URLS } from "@/config/api-urls";
import axios from "axios";
import useAuthStore from "@/stores/auth.store";

export const updateUserInfo = async (
  id: string,
  data: UpdateUserParams
): Promise<UserInfo> => {
  const token = useAuthStore.getState().token;

  if (!token) {
    throw new Error(
      "Token is missing. Please ensure the user is authenticated."
    );
  }

  return axios
    .patch(API_URLS.admin.updateUser + id, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data);
};
