import { API_URLS } from "@/config/api-urls";
import { currentEnv } from "@/config/environment";
import axios from "axios";
import useAuthStore from "@/stores/auth.store";

export async function getAdminProducts(): Promise<IAdminProduct[]> {
  if (currentEnv === "mock") return getAdminProductsMock();
  const token = useAuthStore.getState().token;
  const response = await axios.get(`${API_URLS.product.getAdminProducts}`, {
    headers:
      token && token.length > 0
        ? {
            Authorization: `Bearer ${token}`,
          }
        : {},
  });
  return response.data;
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
  if (currentEnv === "mock") return;
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
  if (currentEnv === "mock") return;
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

function getAdminProductsMock(): IAdminProduct[] {
  return Array(Math.floor(Math.random() * 10 + 5))
    .fill("")
    .map((_, index) => ({
      id: index,
      name: `Product ${index + 1}`,
      discountPrice: Math.floor(Math.random() * 100000) * 1000,
      images: Array(Math.floor(Math.random() * 5 + 1)),
      price: Math.floor(Math.random() * 100000) * 1000,
      discount_price: Math.floor(Math.random() * 100000) * 1000,
      rating: Math.random() * 2 + 3,
      availability: true,
      storageOptions: ["<string>", "<string>"],
      colors: ["<string>", "<string>"],
      categories: [
        {
          id: 1,
          name: "Phone",
        },
      ],
      stock: Math.floor(Math.random() * 100),
      importPrice: Math.floor(Math.random() * 100000) * 1000,

      storageModifiers: Array(Math.floor(Math.random() * 10 + 5))
        .fill("")
        .map((_, index) => index),
      description: "string",
      specifications: {
        key: "value",
      },
      isBestSeller: Math.random() > 0.5,
      isFeatured: Math.random() > 0.5,
      isNewArrival: Math.random() > 0.5,
      releaseDate: "2021-01-01",
    }));
}
