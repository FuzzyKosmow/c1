import { CheckBox, CheckBoxGroup } from "@/components/CheckBox";
import ProductItem from "@/components/ProductItem";
import Text from "@/components/Typography/Text";
import { getProductListAPI } from "@/services/api/product/product-list";
import Link from "next/link";

export default async function Page({
  searchParams,
}: {
  searchParams?: { [key: string]: string | undefined };
}) {
  // Get the query parameter from the URL
  const category = (await searchParams)?.category;
  const sortType = (await searchParams)?.sort;
  const productResponse = await getProductListAPI({ category, sort: sortType });

  const productList = productResponse.products as IProduct[];
  return (
    <div className=" px-24 pt-10">
      <div className=" bg-secondary-200 rounded-md px-5 py-2 flex items-center">
        <Text className=" mr-16 font-semibold">Sort by: </Text>
        <CheckBoxGroup selected={sortType} className=" flex gap-5">
          <Link href={`/home/product-list?sort=price-low-to-high`}>
            <CheckBox title="Price: Low to High" name="price-low-to-high" />
          </Link>
          <Link href={`/home/product-list?sort=price-high-to-low`}>
            <CheckBox title="Price: High to Low" name="price-high-to-low" />
          </Link>
          <Link href={`/home/product-list?sort=most-popular`}>
            <CheckBox title="Most popular" name="most-popular" />
          </Link>
          <Link href={`/home/product-list?sort=newest-arrival`}>
            <CheckBox title="Newest arrival" name="newest-arrival" />
          </Link>
        </CheckBoxGroup>
      </div>
      <div className=" mt-10 grid grid-cols-6 gap-5">
        {productList.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
