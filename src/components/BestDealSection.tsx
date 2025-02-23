"use client";

import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProductCard from "@/components/ProductCard"; // Adjust to your ProductCard component
import { getBestDealsAPI } from "@/services/api/product/product-list";
export default function BestDealSection() {
  const [bestDeals, setBestDeals] = useState([] as IProduct[]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getBestDealsAPI();
      setBestDeals(res.products);
    };
    fetchData();
  }, []);

  const NextArrow = ({ onClick }) => (
    <div
      onClick={onClick}
      className="absolute top-1/2 right-4 z-10 cursor-pointer text-3xl text-gray-500 hover:text-gray-700 transform -translate-y-1/2"
    >
      <BiChevronRight />
    </div>
  );

  const PrevArrow = ({ onClick }) => (
    <div
      onClick={onClick}
      className="absolute top-1/2 left-4 z-10 cursor-pointer text-3xl text-gray-500 hover:text-gray-700 transform -translate-y-1/2"
    >
      <BiChevronLeft />
    </div>
  );

  const settings = {
    dots: false,
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
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  return (
    <div className="py-8 bg-gradient-to-r from-orange-100 to-yellow-100">
      <h2 className="text-3xl font-bold text-center mb-6">
        <span className="inline-block border-b-4 border-green-500 px-4">
          Best Deals
        </span>
      </h2>
      <div className="relative">
        <Slider {...settings}>
          {bestDeals.map((product) => (
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
