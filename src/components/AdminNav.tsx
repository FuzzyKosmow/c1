// /components/AdminNav.tsx
import Link from "next/link";
import { useRouter } from "next/navigation"; // Change to next/navigation for app directory
import { usePathname } from "next/navigation";
import clsx from "clsx";

export default function AdminNav() {
  const pathname = usePathname(); // Get current path
  const tabs = [
    { name: "Dashboard", path: "/admin/dashboard" },
    { name: "Users", path: "/admin/users" },
    { name: "Products", path: "/admin/products" },
    { name: "Orders", path: "/admin/orders" },
    { name: "Vouchers", path: "/admin/vouchers" },
    { name: "Settings", path: "/admin/settings" },
  ];

  return (
    <nav className="w-64 h-screen bg-gray-800 text-white flex flex-col">
      <h1 className="text-xl font-bold p-4">Admin Panel</h1>
      <ul className="flex-grow">
        {tabs.map((tab) => (
          <li
            key={tab.path}
            className={clsx(
              "p-4 hover:bg-gray-700 cursor-pointer",
              pathname === tab.path && "bg-gray-700"
            )}
          >
            <Link href={tab.path}>{tab.name}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
