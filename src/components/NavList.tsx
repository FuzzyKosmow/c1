"use client";

import { NAV_HEADERS } from "@/constants/nav-headers";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Text from "./Typography/Text";

export default function NavList() {
  const pathname = usePathname();

  return (
    <nav className="bg-gradient-to-r from-orange-500 to-yellow-400 py-4">
      <div className="flex gap-12 justify-center">
        {NAV_HEADERS.map(({ title, path }) => (
          <Link
            href={path}
            key={path}
            aria-current={path === pathname ? "page" : undefined}
          >
            <div className="relative group">
              <Text
                className={`pb-[6px] text-white font-medium text-lg transition-all duration-200 
                ${
                  path === pathname
                    ? "text-white font-bold"
                    : "hover:text-yellow-300"
                }`}
              >
                {title}
              </Text>
              {path === pathname && (
                <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-white rounded-sm transition-all duration-300" />
              )}
            </div>
          </Link>
        ))}
      </div>
    </nav>
  );
}
