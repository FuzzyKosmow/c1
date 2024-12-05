import { ChangeEvent, HTMLInputTypeAttribute } from "react";
import { twMerge } from "tailwind-merge";

type ValueType = string | number | undefined;

type Props = React.ComponentPropsWithoutRef<"input"> & {
	value: ValueType;
	name: string;
	onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
	title?: string;
	type?: HTMLInputTypeAttribute;
	required?: boolean;
	placeholder?: string;
};

export function InputField({
	value,
	name,
	onChange = () => {},
	title = "Untitled",
	type = "text",
	required = false,
	placeholder = "",
	className,
	...props
}: Props) {
	return (
		<div className={twMerge(" w-full", className)}>
			<label htmlFor={name} className=" font-bold text-base block mb-2">
				{title}
			</label>
			<input
				type={type}
				id={name}
				name={name}
				value={value}
				onChange={onChange}
				required={required}
				placeholder={placeholder}
				className=" w-full p-3 rounded-lg border-[1px] border-[#ddd]"
				{...props}
			/>
		</div>
	);
}
