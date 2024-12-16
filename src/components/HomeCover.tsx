"use client";

import Image from "next/image";
import BG from "../assets/bg-ornament.jpg";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { increaseViewCount } from "@/services/api/stats/trackViewCount";
// Simply display the image full width. With only limited height.
export default function HomeCover() {
  useEffect(() => {
    increaseViewCount("home")
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="relative pt-0">
      <Image src={BG} layout="fit" objectFit="cover" alt="Home Cover" />
    </div>
  );
}
