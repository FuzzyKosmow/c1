"use client";

import { selfCheckAPI } from "@/services/api/auth/selfCheck";
import { useEffect, useState } from "react";
import { FiPhone, FiUser, FiHeadphones } from "react-icons/fi";
import { logoutAPI } from "@/services/api/auth/logout";
const ContactNav = () => {
  const [accountName, setAccountName] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const res = await selfCheckAPI();
      if (res !== null) {
        setAccountName(res.fullName);
      } else {
        setAccountName("Login");
      }
    };
    fetchData();
  }, []);
  const handleLogout = () => {
    logoutAPI();
    setAccountName("Login");
  };

  return (
    <div className="flex justify-end gap-8 items-center py-2 px-6 bg-gradient-to-r from-orange-400 to-yellow-400 text-white shadow-md">
      {/* Phone */}
      <a
        href="tel:444-555-666"
        className="flex items-center gap-2 hover:text-white transition duration-300"
      >
        <FiPhone className="text-xl" />
        <span className="text-lg font-medium">444-555-666</span>
      </a>

      {/* Customer Service */}
      <a
        href="#"
        className="flex items-center gap-2 hover:text-white transition duration-300"
      >
        <FiHeadphones className="text-xl" />
        <span className="text-lg font-medium">Customer Service</span>
      </a>

      {/* Account/Login */}
      <a
        href={accountName === "Login" ? "/sign-in " : "/account"}
        className="flex items-center gap-2 hover:text-white transition duration-300"
      >
        <FiUser className="text-xl" />
        <span className="text-lg font-medium">{accountName}</span>
      </a>
      {/* Logout */}
      {accountName !== "Login" && (
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-red-500 hover:text-red-700 transition duration-300"
        >
          <span className="text-lg font-medium">Logout</span>
        </button>
      )}
    </div>
  );
};

export default ContactNav;
