"use client";

import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import getFeatured from "@/services/api/product/get-featured";
import ProductCard from "@/components/ProductCard"; // Adjust the import path based on your folder structure.

export default function FeaturedProductSection() {
  const [products, setProducts] = useState([] as IProduct[]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getFeatured();
      console.log("res", res); // Check the response in the console
      setProducts(res);
    };
    fetchData();
  }, []);

  const NextArrow = ({ onClick }) => (
    <div
      onClick={onClick}
      className="absolute top-1/2 right-4 z-10 cursor-pointer text-2xl text-gray-700 transform -translate-y-1/2"
    >
      <BiChevronRight />
    </div>
  );

  const PrevArrow = ({ onClick }) => (
    <div
      onClick={onClick}
      className="absolute top-1/2 left-4 z-10 cursor-pointer text-2xl text-gray-700 transform -translate-y-1/2"
    >
      <BiChevronLeft />
    </div>
  );

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <NextArrow onClick={undefined} />,
    prevArrow: <PrevArrow onClick={undefined} />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const priceFormat = (price: number) => {
    // VND
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  return (
    <div className="p-8 bg-gray-100">
      <h2 className="text-3xl font-bold text-center mb-6">
        <span className="inline-block border-b-4 border-blue-500 px-4">
          Featured
        </span>
      </h2>
      <div className="relative">
        <Slider {...settings}>
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              priceFormat={priceFormat}
            />
          ))}
        </Slider>
      </div>
    </div>
  );
}
