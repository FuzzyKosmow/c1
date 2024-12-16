"use client";

import Image from "next/image";
import LOGO from "../assets/logo.png"; // Assuming you have a logo
import SEARCH_ICON from "../assets/icons/search-lg.svg";
import NOTIFICATION_ICON from "../assets/icons/bell.svg";
import CART_ICON from "../assets/icons/cart.svg";
import PROFILE_ICON from "../assets/icons/user.svg";
import IconButton from "./IconButton";
import NavList from "./NavList";
import { useState } from "react";
import CartModal from "./CartModal";
import { useRouter } from "next/navigation";
export default function NavHeader() {
  const [isCartOpen, setCartOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const router = useRouter();
  const toggleCart = () => setCartOpen(!isCartOpen);
  const handleSearch = (string: string) => {
    setSearchQuery(string);
    router.push(`/souvenir?search=${string}`);
  };
  return (
    <div className="bg-gradient-to-b from-orange-500 to-yellow-400">
      <div className="px-24 py-4 flex justify-between items-center">
        <div className="flex gap-5 items-center">
          <Image src={LOGO} width={100} height={100} alt="logo" />
          <p className="text-3xl font-bold text-white font-[Pacifico]">
            Souvenir Planet
          </p>
        </div>
        <div className="flex gap-5 items-center justify-end">
          <div className="px-5 py-2 w-[500px] rounded-[2rem] flex items-center gap-4 border-[1px] border-white bg-white/80 shadow-lg">
            <input
              className="flex-1 text-black-700 outline-none text-lg bg-transparent placeholder-gray-500"
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search souvenirs..."
            />
            <Image src={SEARCH_ICON} width={24} height={24} alt="search" />
          </div>
          <div className="flex gap-5 items-center">
            <IconButton icon={CART_ICON} alt="cart" onClick={toggleCart} />
            <IconButton icon={NOTIFICATION_ICON} alt="notifications" />
          </div>
        </div>
      </div>
      <NavList />

      {/* Cart Modal */}
      <CartModal isOpen={isCartOpen} onClose={toggleCart} />
    </div>
  );
}
