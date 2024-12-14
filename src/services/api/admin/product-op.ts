import { API_URLS } from "@/config/api-urls";
import { currentEnv } from "@/config/environment";
import axios from "axios";
import useAuthStore from "@/stores/auth.store";

interface GetProductAdminParams {
  limit?: number;
  page?: number;
  keyword?: string;
  category?: string;
  sort?: string;
}

export async function getAdminProducts({
  limit = 10,
  page = 1,
  keyword = "",
  category = "",
  sort = "",
}: GetProductAdminParams = {}): Promise<{
  total: number;
  products: IAdminProduct[];
}> {
  const token = useAuthStore.getState().token;
  const response = await axios.get(`${API_URLS.product.getAdminProducts}`, {
    headers:
      token && token.length > 0
        ? {
            Authorization: `Bearer ${token}`,
          }
        : {},
    params: {
      limit,
      page,
      keyword,
      category,
      sort,
    },
  });
  const total = response.headers["x-total-count"];
  return { total, products: response.data };
}
export async function addProduct(product: UpsertProductDTO): Promise<void> {
  if (currentEnv === "mock") return;
  const token = useAuthStore.getState().token;

  const res = await axios.post(`${API_URLS.admin.addProduct}`, product, {
    headers:
      token && token.length > 0
        ? {
            Authorization: `Bearer ${token}`,
          }
        : {},
  });
  if (res.status !== 201) throw new Error("Failed to add product");

  return res.data;
}

export async function updateProduct(
  id: string,
  product: UpsertProductDTO
): Promise<void> {
  const token = useAuthStore.getState().token;

  const res = await axios.put(`${API_URLS.admin.updateProduct}${id}`, product, {
    headers:
      token && token.length > 0
        ? {
            Authorization: `Bearer ${token}`,
          }
        : {},
  });
  if (res.status !== 200) throw new Error("Failed to update product");

  return res.data;
}

export async function deleteProduct(id: string): Promise<void> {
  const token = useAuthStore.getState().token;
  const res = await axios.delete(`${API_URLS.admin.deleteProduct}${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (res.status !== 200 && res.status !== 204)
    throw new Error("Failed to delete product");

  return res.data;
}
