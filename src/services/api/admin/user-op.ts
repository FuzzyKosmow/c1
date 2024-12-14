import { API_URLS } from "@/config/api-urls";
import useAuthStore from "@/stores/auth.store";
import axios from "axios";

interface UpdateUserParams {
  fullName?: string;
  address?: string;
  province?: string;
  district?: string;
  phoneNumber?: string;
}
interface GetUserAdminParams {
  page?: number;
  limit?: number;
}
export const getUsersAdmin = async ({
  page = 1,
  limit = 10,
}: GetUserAdminParams = {}) => {
  const token = useAuthStore.getState().token;

  if (!token) {
    throw new Error(
      "Token is missing. Please ensure the user is authenticated."
    );
  }

  const res = await axios.get(API_URLS.admin.getUsers, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      page,
      limit,
    },
  });

  return { total: res.headers["x-total-count"], users: res.data };
};
export const deleteUserAdmin = async (id: string) => {
  const token = useAuthStore.getState().token;

  if (!token) {
    throw new Error(
      "Token is missing. Please ensure the user is authenticated."
    );
  }

  const res = await fetch(`${API_URLS.admin.deleteUser}${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Failed to delete user");
};
export const updateUserAdmin = async (id: string, data: UpdateUserParams) => {
  const token = useAuthStore.getState().token;

  if (!token) {
    throw new Error(
      "Token is missing. Please ensure the user is authenticated."
    );
  }
  console.log("path:" + API_URLS.admin.updateUser + id);
  const res = await fetch(API_URLS.admin.updateUser + id, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to update user");
  return await res.json();
};
