import { API_URLS } from "@/config/api-urls";
import useAuthStore from "@/stores/auth.store";

interface UpdateUserParams {
  fullName?: string;
  address?: string;
  province?: string;
  district?: string;
  phoneNumber?: string;
}

export const getUsersAdmin = async () => {
  const token = useAuthStore.getState().token;

  if (!token) {
    throw new Error(
      "Token is missing. Please ensure the user is authenticated."
    );
  }

  const res = await fetch(API_URLS.admin.getUsers, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Failed to get users");
  return await res.json();
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
