import { API_URLS } from "@/config/api-urls";
import axios from "axios";
import useAuthStore from "@/stores/auth.store";
interface AddVoucherParams {
  name: string;
  discountPercentage: number;
  description: string;
  expiryDate: string;
}

export const addVoucher = async (params: AddVoucherParams) => {
  const { token } = useAuthStore.getState();
  const response = await axios.post(API_URLS.admin.addVoucher, params, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getVouchersFromAdmin = async () => {
  const { token } = useAuthStore.getState();
  const response = await axios.get(API_URLS.admin.getVouchersFromAdmin, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const activateVoucher = async (voucherCode: string) => {
  const { token } = useAuthStore.getState();
  const response = await axios.put(
    API_URLS.admin.activateVoucher.replace("{voucherCode}", voucherCode),
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const deactivateVoucher = async (voucherCode: string) => {
  const { token } = useAuthStore.getState();
  const response = await axios.put(
    API_URLS.admin.deactivateVoucher.replace("{voucherCode}", voucherCode),
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const deleteVoucher = async (voucherCode: string) => {
  const { token } = useAuthStore.getState();

  const response = await axios.delete(
    API_URLS.admin.deleteVoucher + `${voucherCode}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        code: voucherCode,
      },
    }
  );
  return response.data;
};
