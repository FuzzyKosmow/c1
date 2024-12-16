import { API_URLS } from "@/config/api-urls";
import useAuthStore from "@/stores/auth.store";

const canUsePromoCode = async (promoCode: string) => {
  const authToken = useAuthStore.getState().token;
  const res = fetch(
    // To path voucher/{code}/discount-amount
    API_URLS.cart.canUsePromoCode.replace("code", promoCode),
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    }
  ).then((res) => res.json());
  return res;
};

export default canUsePromoCode;
