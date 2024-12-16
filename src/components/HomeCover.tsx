"use client";

import Image from "next/image";
import BG from "../assets/bg-ornament.jpg";

// Simply display the image full width. With only limited height.
export default function HomeCover() {
  return (
    <div className="relative pt-0">
      <Image src={BG} layout="fit" objectFit="cover" alt="Home Cover" />
    </div>
  );
}
