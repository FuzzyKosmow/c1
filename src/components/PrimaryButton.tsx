import { twMerge } from "tailwind-merge";

type Props = React.ComponentPropsWithoutRef<"button"> & {};

export default function PrimaryButton({ className, ...props }: Props) {
	return (
		<button
			className={twMerge(
				" w-full p-4 duration-200 bg-black-500 hover:bg-black-400",
				" text-white font-semibold rounded-lg",
				className
			)}
			{...props}
		></button>
	);
}
