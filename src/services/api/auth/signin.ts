import { API_URLS } from "@/config/api-urls";
import axios from "axios";
import useAuthStore from "@/stores/auth.store";
export async function signInAPI(
  input: CredentialInput
): Promise<SignInAPIResponse> {
  const response = await axios.post(`${API_URLS.auth.signin}`, {
    email: input.username,
    password: input.password,
  });
  const token = response.data;
  if (token) {
    useAuthStore.getState().setToken(token);
  } else throw new Error("Invalid credentials");
  const roleResponse = await axios.get(`${API_URLS.auth.me}`, {
    headers:
      token && token.length > 0
        ? {
            Authorization: `Bearer ${token}`,
          }
        : {},
  });
  const role = roleResponse.data.role;
  useAuthStore.getState().setRole(role);

  return { token, role };
}
