import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

export default function H1({
	children,
	className,
	...props
}: { children: ReactNode } & React.ComponentPropsWithoutRef<"p">) {
	return (
		<p
			className={twMerge(
				" font-semibold text-[2.5rem] text-black-500",
				className
			)}
			{...props}
		>
			{children}
		</p>
	);
}
