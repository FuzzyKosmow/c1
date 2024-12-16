/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect } from "react";
import { mockProductList } from "../services/api/product/product-similar";
import { getProductDetailAPI } from "@/services/api/product/product-detail";
import ProductItem from "./ProductItem";
import StarRating from "./StarRating";

interface ProductDetailProps {
  productId: string;
}

export default function ProductDetail({ productId }: ProductDetailProps) {
  const [product, setProduct] = useState<ProductDetailAPIResponse | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [displayPrice, setDisplayPrice] = useState<number>(0);
  const [oldDisplayPrice, setOldDisplayPrice] = useState<number>(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetchProductDetail(productId);
  }, []);

  const fetchProductDetail = async (productId: string) => {
    const data = await getProductDetailAPI(productId);
    if (data) {
      setProduct(data);
      setDisplayPrice(data.discount_price || data.price);
      setOldDisplayPrice(data.discount_price ? data.price : 0);
    }
  };

  const increaseQuantity = () => setQuantity(quantity + 1);
  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? product!.images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === product!.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const addToCart = () => {
    const item = {
      id: product!.id,
      quantity,
    };
    localStorage.setItem("cart", JSON.stringify([item]));
    console.log("Added to cart: ", item);
  };

  if (!product) return <p>Loading...</p>;

  // Calculate discount percentage
  const discountPercentage = oldDisplayPrice
    ? Math.round(((oldDisplayPrice - displayPrice) / oldDisplayPrice) * 100)
    : null;

  return (
    <div className="container mx-auto px-4 py-6">
      <nav className="text-sm text-gray-500 mb-4">
        Home {">"} {product.categories?.[0]?.name || "Category"} {">"}{" "}
        {product.name}
      </nav>

      <div className="flex flex-wrap md:flex-nowrap md:space-x-6">
        {/* Product Image with Discount Badge */}
        <div className="relative w-full h-96 flex items-center justify-center">
          {discountPercentage && (
            <div className="absolute top-2 left-2 bg-red-500 text-white text-sm font-bold px-2 py-1 rounded">
              -{discountPercentage}%
            </div>
          )}
          <img
            src={product.images[currentIndex]}
            alt={`product-image-${currentIndex}`}
            className="rounded-lg object-contain h-full w-2/3"
          />
          <button
            onClick={handlePrev}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black/50 text-white text-2xl px-4 py-2 rounded-full"
          >
            ‹
          </button>
          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black/50 text-white text-2xl px-4 py-2 rounded-full"
          >
            ›
          </button>
        </div>

        {/* Product Details */}
        <div className="w-full md:w-1/2 px-4">
          <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>

          {/* Price and Rating */}
          <div className="flex items-baseline space-x-2 mb-2">
            <p className="text-4xl font-bold text-black">
              {displayPrice.toLocaleString()} đ
            </p>
            {oldDisplayPrice > 0 && (
              <p className="text-lg text-gray-500 line-through">
                {oldDisplayPrice.toLocaleString()} đ
              </p>
            )}
          </div>

          <StarRating rating={product.rating} />

          {/* Add to Cart Section */}
          <div className="flex items-center mt-6 space-x-4">
            <div className="flex items-center border border-gray-300 rounded-lg">
              <button
                className="px-4 py-2 text-white bg-gray-700 hover:bg-gray-600"
                onClick={decreaseQuantity}
              >
                -
              </button>
              <span className="px-4">{quantity}</span>
              <button
                className="px-4 py-2 text-white bg-gray-700 hover:bg-gray-600"
                onClick={increaseQuantity}
              >
                +
              </button>
            </div>
            <button
              className="text-white bg-gray-800 px-6 py-2 rounded-lg flex items-center justify-center w-full md:w-auto hover:bg-gray-700"
              onClick={addToCart}
            >
              Add to Cart
            </button>
          </div>

          {/* Product Metadata */}
          <div className="mt-6">
            {product.release_date && (
              <p className="text-gray-700">
                <strong>Release Date:</strong>{" "}
                {new Date(product.release_date).toLocaleDateString()}
              </p>
            )}
            {product.categories?.length > 0 && (
              <p className="text-gray-700">
                <strong>Category:</strong>{" "}
                {product.categories.map((cat) => cat.name).join(", ")}
              </p>
            )}
            {product.is_bestseller && (
              <p className="text-green-600 font-semibold">Bestseller!</p>
            )}
          </div>
        </div>
      </div>

      {/* Product Description Section */}
      <div className="mt-10 grid grid-cols-1">
        <div className="bg-white p-8 rounded-lg shadow-md border border-gray-300">
          <div className="mb-6">
            <h2 className="text-3xl font-extrabold text-gray-900">
              About the Product
            </h2>
          </div>
          <p className="text-lg leading-relaxed text-gray-700">
            {product.description}
          </p>

          {product.is_bestseller && (
            <p className="mt-4 inline-block bg-green-100 text-green-800 text-sm font-semibold px-4 py-2 rounded">
              Bestseller
            </p>
          )}

          {product.is_new_arrival && (
            <p className="mt-4 inline-block bg-blue-100 text-blue-800 text-sm font-semibold px-4 py-2 rounded">
              New Arrival
            </p>
          )}

          {product.is_popular && (
            <p className="mt-4 inline-block bg-yellow-100 text-yellow-800 text-sm font-semibold px-4 py-2 rounded">
              Popular Choice
            </p>
          )}
        </div>
      </div>

      {/* Similar Products Section */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          Similar Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {mockProductList.map((item) => (
            <ProductItem key={item.id} product={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
