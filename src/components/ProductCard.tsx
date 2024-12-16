"use client";

import React from "react";
import { useRouter } from "next/navigation";

interface ProductCardProps {
  product: IProduct;
  priceFormat: (price: number) => string;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, priceFormat }) => {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/product/${product.id}`);
  };

  // Calculate discount percentage
  const discountPercentage = product.discount_price
    ? Math.round(
        ((product.price - product.discount_price) / product.price) * 100
      )
    : null;

  return (
    <div className="p-4 cursor-pointer" onClick={handleCardClick}>
      <div className="relative bg-white shadow-md rounded-lg overflow-hidden">
        {/* Badge for discount */}
        {discountPercentage && discountPercentage > 0 && (
          <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            -{discountPercentage}%
          </div>
        )}
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover object-center"
        />

        <div className="p-4 text-center">
          <h3 className="font-semibold text-lg truncate max-w-full">
            {product.name}
          </h3>

          <div className="mt-2 flex justify-center items-center space-x-2">
            {product.discount_price && product.discount_price > 0 ? (
              <>
                <p className="text-gray-500 line-through">
                  {priceFormat(product.price)}
                </p>
                <p className="text-red-500 font-bold">
                  {priceFormat(product.discount_price)}
                </p>
              </>
            ) : (
              <p className="text-gray-700">{priceFormat(product.price)}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
