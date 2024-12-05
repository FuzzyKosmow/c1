"use client";

import Image from "next/image";
import PrimaryButton from "./PrimaryButton";

import MAIN_HERO_IMAGE from "@/assets/introductions/main-hero.png";
import SUB_HERO_1_IMAGE from "@/assets/introductions/sub-hero-1.png";
import SUB_HERO_2_IMAGE from "@/assets/introductions/sub-hero-2.png";
import SUB_HERO_3_IMAGE from "@/assets/introductions/sub-hero-3.png";
import CHEVRON from "@/assets/icons/chevron-right-white.svg";

export default function HomeCover() {
  return (
    <div>
      <div className=" relative">
        <Image
          className=" w-full h-[440px] xl:h-[600px] object-fill"
          src={MAIN_HERO_IMAGE}
          alt="Main hero"
        />
        <PrimaryButton className=" absolute bottom-5 left-10 w-40">
          <p className=" w-full flex justify-center gap-2">
            See more <Image src={CHEVRON} alt="chevron" />
          </p>
        </PrimaryButton>
      </div>
      <div className=" mt-8 flex gap-8">
        <Image
          className=" w-full h-[300px] xl:h-[400px] object-fill"
          src={SUB_HERO_1_IMAGE}
          alt="First sub-hero"
        />
        <Image
          className=" w-full h-[300px] xl:h-[400px] object-fill"
          src={SUB_HERO_2_IMAGE}
          alt="Second sub-hero"
        />
        <Image
          className=" w-full h-[300px] xl:h-[400px] object-fill"
          src={SUB_HERO_3_IMAGE}
          alt="Third sub-hero"
        />
      </div>
    </div>
  );
}
