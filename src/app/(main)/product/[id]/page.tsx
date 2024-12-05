/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import ProductDetail from "@/components/ProductDetail";
import { useParams } from "next/navigation";
import { getProductDetailAPI } from "@/services/api/product/product-detail";

export default function ProductDetailPage() {
  const [product, setProduct] = useState<any>(null);
  const { id } = useParams();

  useEffect(() => {
    console.log("Params: ", id);
    if (id) {
      fetchProductDetail(id as string);
    }
  }, [id]);

  const fetchProductDetail = async (productId: string) => {
    const data = await getProductDetailAPI(productId);
    if (data) setProduct(data);
  };

  if (!product) return <p>Loading...</p>;

  return <ProductDetail productId={id as string} />;
}
