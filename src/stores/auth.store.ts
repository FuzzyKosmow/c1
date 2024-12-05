"use client";

import { create } from "zustand";

interface AuthState {
  token: string | null;
  role: string | null;
  setToken: (token: string) => void;
  setRole: (role: string) => void;
  clearToken: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  token: localStorage.getItem("authToken") || null,
  role: localStorage.getItem("role") || null,
  setToken: (token) => {
    localStorage.setItem("authToken", token);
    set({ token });
  },
  setRole: (role) => {
    localStorage.setItem("role", role);
    set({ role });
  },
  clearToken: () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("role");
    set({ token: null });
  },
}));

export default useAuthStore;
