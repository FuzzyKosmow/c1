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
  const category = decodeURIComponent((await searchParams)?.category || "");
  const country = (await searchParams)?.country;
  const relatedCity = (await searchParams)?.relatedCity;
  const sortType = (await searchParams)?.sort;
  const search = (await searchParams)?.search;
  console.log("category", category);
  console.log("country", country);
  console.log("city", relatedCity);

  const productResponse = await getProductListAPI({
    category: category,
    country: country,
    relatedCity: relatedCity,
    sort: sortType,
    keyword: search,
  });

  const productList = productResponse.products as IProduct[];

  return (
    <div className=" px-24 pt-10">
      <div className=" bg-secondary-200 rounded-md px-5 py-2 flex items-center">
        <Text className=" mr-16 font-semibold">Sort by: </Text>
        <CheckBoxGroup selected={sortType} className=" flex gap-5">
          <Link
            href={`/souvenir?sort=${encodeURIComponent("price-low-to-high")}`}
          >
            <CheckBox title="Price: Low to High" name="price-low-to-high" />
          </Link>
          <Link
            href={`/souvenir?sort=${encodeURIComponent("price-high-to-low")}`}
          >
            <CheckBox title="Price: High to Low" name="price-high-to-low" />
          </Link>

          <Link href={`/souvenir?sort=${encodeURIComponent("newest-arrival")}`}>
            <CheckBox title="Newest arrival" name="newest-arrival" />
          </Link>
        </CheckBoxGroup>
      </div>
      <div className=" mt-10 grid grid-cols-4 gap-5">
        {productList.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
