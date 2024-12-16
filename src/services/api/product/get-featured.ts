import axios from "axios";
import useAuthStore from "@/stores/auth.store";
import { API_URLS } from "@/config/api-urls";
// Return ProductListAPIResponse
export default async function getFeatured() {
  const { token } = useAuthStore.getState();
  const response = await axios.get(API_URLS.product.getFeatured, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}
