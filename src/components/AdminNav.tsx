// /components/AdminNav.tsx
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import DASHBOARD_ICON from "@/assets/icons/home-line.svg";
import USERS_ICON from "@/assets/icons/users-04.svg";
import PRODUCTS_ICON from "@/assets/icons/phone-01.svg";
import ORDERS_ICON from "@/assets/icons/sale-02.svg";

import VOUCHER_ICON from "@/assets/icons/voucher.svg";
import Image from "next/image";
export default function AdminNav() {
  const pathname = usePathname(); // Get current path
  const tabs = [
    { name: "Dashboard", path: "/admin/dashboard" },
    { name: "Users", path: "/admin/users" },
    { name: "Products", path: "/admin/products" },
    { name: "Orders", path: "/admin/orders" },
    { name: "Vouchers", path: "/admin/vouchers" },
  ];
  const router = useRouter();
  const handleOnClick = (path: string) => {
    router.replace(path);
  };
  const getIcon = (name: string) => {
    switch (name) {
      case "Dashboard":
        return DASHBOARD_ICON;
      case "Users":
        return USERS_ICON;
      case "Products":
        return PRODUCTS_ICON;
      case "Orders":
        return ORDERS_ICON;
      case "Vouchers":
        return VOUCHER_ICON;
      default:
        return "";
    }
  };

  return (
    <nav className="w-64 h-screen bg-white text-black flex flex-col border-r-2">
      <h1 className="text-xl font-bold p-4">Admin Panel</h1>
      <ul className="flex-grow">
        {tabs.map((tab) => (
          <li
            key={tab.path}
            className={clsx(
              "p-4 hover:bg-gray-700 cursor-pointer flex gap-2",
              pathname === tab.path && " border-l-4 border-black-500 "
            )}
            onClick={() => handleOnClick(tab.path)}
          >
            <Image
              src={getIcon(tab.name)}
              alt={tab.name}
              width={24}
              height={24}
            />
            <span className="text-black-500">{tab.name}</span>
          </li>
        ))}
      </ul>
    </nav>
  );
}
