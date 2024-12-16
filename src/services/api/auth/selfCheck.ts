import { API_URLS } from "@/config/api-urls";
import axios from "axios";
import useAuthStore from "@/stores/auth.store";
// Used to get information about one's account
export async function selfCheckAPI(): Promise<UserInfo | null> {
  try {
    const token = useAuthStore.getState().token;
    const response = await axios.get(API_URLS.auth.me, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return null;
  }
}
