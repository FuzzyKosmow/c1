import Image from "next/image";
import DISCOUNT_TAG from "@/assets/icons/discount-tag.svg";
import { currencyFormatter } from "@/utils/formatter";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

type Props = React.ComponentPropsWithoutRef<"div"> & {
  product: IProduct;
};

export default function ProductItem({ product, className }: Props) {
  const priceOffPercent = (
    (1 - product.discount_price / product.price) *
    100
  ).toFixed(0);

  return (
    <div className={twMerge(" w-[185px] relative duration-200", className)}>
      <Image
        src={product.image}
        width={185}
        height={200}
        objectFit="cover"
        alt="product preview"
      />
      {product.discount_price !== null && product.discount_price !== 0 && (
        <>
          <Image
            className=" absolute -left-1 top-0"
            src={DISCOUNT_TAG}
            width={50}
            height={25}
            alt="discount tag"
          />
          <p className=" absolute top-[0.1rem] left-1 text-white text-[0.6rem]">
            {priceOffPercent}% Off
          </p>
        </>
      )}

      <div className=" pt-2 flex flex-col gap-4">
        <Link href={`/product/${product.id}`}>
          <p className=" mt-2 text-lg text-black-300 hover:underline">
            {" "}
            {product.name}{" "}
          </p>
        </Link>
        {/* <div> Wrong line through
          {product.discount_price !== null && product.discount_price !== 0 && (
            <div className=" flex gap-2">
              <p className=" line-through text-sm text-black-200">
                {currencyFormatter.format(product.discount_price)}{" "}
              </p>
              <p className=" text-sm text-danger">-{priceOffPercent}%</p>
            </div>
          )}
          <p className=" text-black-500 font-medium text-lg">
            {currencyFormatter.format(product.price)}
          </p>
        </div> */}
        <div>
          <div>
            {product.discount_price !== null && product.discount_price !== 0 ? (
              <>
                <div className=" flex gap-2">
                  <p className=" line-through text-sm text-black-200">
                    {currencyFormatter.format(product.price)}{" "}
                  </p>
                  <p className=" text-sm text-danger">-{priceOffPercent}%</p>
                </div>
                <p className=" text-black-500 font-medium text-lg">
                  {currencyFormatter.format(product.discount_price)}
                </p>
              </>
            ) : (
              <p className=" text-black-500 font-medium text-lg">
                {currencyFormatter.format(product.price)}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
