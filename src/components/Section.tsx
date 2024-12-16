import React from "react";
import { twMerge } from "tailwind-merge";

import CHEVRON_RIGHT from "@/assets/icons/chevron-right.svg";
import Image from "next/image";

type Props = React.ComponentPropsWithoutRef<"div"> & {
	title: string;
	moreTitle?: string;
	url?: string;
};

export default function Section({
	title,
	moreTitle = "View more",
	url,
	children,
	className,
}: Props) {
	return (
		<section className={twMerge(" flex flex-col gap-8", className)}>
			<div className=" flex justify-between">
				<p className=" font-semibold text-2xl">{title}</p>
				{url ? (
					<a
						href={url}
						className=" font-semibold text-lg hover:underline underline-offset-3 flex gap-1"
                        target="_blank"
					>
						<span>{moreTitle}</span>
						<Image src={CHEVRON_RIGHT} alt="chevron-right" />
					</a>
				) : (
					<p></p>
				)}
			</div>
			{children}
		</section>
	);
}
