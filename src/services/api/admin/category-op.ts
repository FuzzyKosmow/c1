import { API_URLS } from "@/config/api-urls";
import useAuthStore from "@/stores/auth.store";
interface INewCategory {
  name: string;
  image: string;
  description: string;
  isPopular: boolean;
}

export const createCategoryAPI = async (category: INewCategory) => {
  const token = useAuthStore.getState().token;
  const res = await fetch(API_URLS.admin.addCategory, {
    method: "POST",
    body: JSON.stringify(category),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error("Failed to create category");
  return await res.json();
};

export const deleteCategoryAPI = async (categoryId: number) => {
  const token = useAuthStore.getState().token;
  const res = await fetch(`${API_URLS.admin.deleteCategory}/${categoryId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error("Failed to delete category");
};
