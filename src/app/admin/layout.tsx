"use client";

import AdminNav from "@/components/AdminNav";
import { useRouter, usePathname } from "next/navigation"; // Use `usePathname`
import useAuthStore from "@/stores/auth.store";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname(); // Get current path
  const role = useAuthStore((state) => state.role);
  const token = useAuthStore((state) => state.token);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const adminCheck = async () => {
      if (isMounted && role !== "Admin") {
        router.replace("/sign-in");
      }
      const res = await fetch("http://localhost:5100/api/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status !== 200) {
        router.replace("/sign-in");
      }
    };
    adminCheck();
  }, [isMounted, role, router]);

  if (!isMounted) {
    return null;
  }

  if (role !== "Admin") {
    return null;
  }

  const getBreadcrumb = () => {
    const pathSegments = pathname.split("/").filter(Boolean); // Use `pathname`
    // default is admin/dashboard
    // Display Dashboard/
    // If path is admin/products, display Dashboard / Products

    return (
      <div className="text-sm text-gray-500">
        {pathSegments.map((segment, index) => {
          const href = "/" + pathSegments.slice(0, index + 1).join("/");

          return (
            <span key={href}>
              <Link href={href}>
                {segment === "admin" && index === 0
                  ? "Dashboard"
                  : segment.charAt(0).toUpperCase() + segment.slice(1)}
              </Link>
              {index < pathSegments.length - 1 && " / "}
            </span>
          );
        })}
      </div>
    );
  };

  return (
    <div className="flex">
      <AdminNav />
      <main className="flex-grow p-6">
        <div className="flex justify-between items-center mb-6 border-b pb-4">
          {getBreadcrumb()}
          <button
            onClick={() => {
              useAuthStore.setState({ token: null, role: null });
              router.replace("/sign-in");
            }}
            className="flex items-center gap-2 text-red-500"
          >
            <span>Logout</span>
          </button>
        </div>
        {children}
      </main>
    </div>
  );
}
