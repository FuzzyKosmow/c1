import { API_URLS } from "@/config/api-urls";
import useAuthStore from "@/stores/auth.store";
import axios from "axios";

interface TrackOrderParams {
  phoneNumber: string;
  trackingId: string;
}

export const trackingOrder = async ({
  phoneNumber,
  trackingId,
}: TrackOrderParams) => {
  const token = useAuthStore.getState().token;

  return axios
    .get(API_URLS.home.trackOrder, {
      params: {
        phoneNumber,
        trackingId,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data);
};
