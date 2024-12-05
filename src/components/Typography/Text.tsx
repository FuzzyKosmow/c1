import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

export default function Text({
	children,
	className,
	...props
}: { children: ReactNode } & React.ComponentPropsWithoutRef<"p">) {
	return (
		<p
			className={twMerge(
				" font-normal text-base text-black-500",
				className
			)}
			{...props}
		>
			{children}
		</p>
	);
}
