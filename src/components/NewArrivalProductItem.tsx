import Image from "next/image";

import DISCOUNT_TAG from "@/assets/icons/discount-tag.svg";
import { currencyFormatter } from "@/utils/formatter";
import Link from "next/link";
import { twMerge } from "tailwind-merge";
import PrimaryButton from "./PrimaryButton";

import CART_ICON from "@/assets/icons/cart-white.svg";

type Props = React.ComponentPropsWithoutRef<"div"> & {
	product: IProduct;
};

export default function NewArrivalProductItem({ product, className }: Props) {
	const priceOffPercent = (
		(1 - product.discount_price / product.price) *
		100
	).toFixed(0);

	return (
		<div
			className={twMerge(
				" w-[185px] flex gap-6 relative duration-200",
				className
			)}
		>
			<Image
				src={product.image}
				width={185}
				height={200}
				objectFit="cover"
				alt="product preview"
			/>
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
			<div className=" flex flex-col gap-4">
				<Link href={`/product/${product.id}`}>
					<p className=" mt-2 text-xl text-black-300 hover:underline">
						{product.name}{" "}
					</p>
				</Link>
				<div className=" flex flex-row items-end gap-4">
					<p className=" text-black-500 font-medium text-lg">
						{currencyFormatter.format(product.price)}
					</p>
					<p className=" line-through text-md text-black-200">
						{currencyFormatter.format(product.discount_price)}{" "}
					</p>
				</div>
				<PrimaryButton className="mt-auto">
					<p className=" w-full flex justify-center gap-2">
						Add to cart <Image src={CART_ICON} alt="cart" />
					</p>
				</PrimaryButton>
			</div>
		</div>
	);
}
