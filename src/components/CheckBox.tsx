"use client";

import {
	createContext,
	ReactNode,
	useCallback,
	useContext,
	useEffect,
	useState,
} from "react";
import Text from "./Typography/Text";
import { twMerge } from "tailwind-merge";

import CHECK_ICON from "@/assets/icons/check.svg";
import Image from "next/image";

type CheckBoxProps = Omit<
	React.ComponentPropsWithRef<"div">,
	"title" | "name"
> & {
	title: ReactNode;
	name: string;
};

type CheckBoxGroupProps = {
	selected?: string;
	setSelected?: (value: string) => any;
	children: ReactNode;
} & React.ComponentPropsWithRef<"div">;

const CheckBoxGroupContext = createContext<{
	selected?: string;
	setSelected: (value: string) => unknown;
}>({
	selected: "",
	setSelected: () => {},
});

export function CheckBox({ title, name, className }: CheckBoxProps) {
	const [isChecked, setIsChecked] = useState(false);

	const { selected, setSelected } = useContext(CheckBoxGroupContext);

	useEffect(() => {
		setIsChecked(selected === name);
	}, [selected, name]);

	useEffect(() => {
		if (isChecked) {
			setSelected(name);
		}
	}, [isChecked, name, setSelected]);

	const handleCheck = useCallback(() => {
		setIsChecked((prev) => !prev);
	}, [setIsChecked]);

	return (
		<button
			className={twMerge(
				"px-4 py-3 relative rounded-lg border-[1px] border-black-500 bg-white hover:bg-secondary-200 duration-200",
				" overflow-hidden",
				className
			)}
			onClick={handleCheck}
		>
			<Text className=" font-medium flex items-center">{title}</Text>
			<div
				className={twMerge(
					"  w-8 h-8 -right-4 absolute bg-black-500 rotate-45 duration-200",
					isChecked ? " -bottom-4" : " -bottom-8"
				)}
			></div>
			<Image
				className={twMerge(
					" absolute right-0 duration-200",
					isChecked ? " bottom-[2px]" : " -bottom-1"
				)}
				src={CHECK_ICON}
				alt="check"
			/>
		</button>
	);
}

export function CheckBoxGroup({
	children,
	className,
	selected,
	setSelected = () => {},
	...props
}: CheckBoxGroupProps) {
	return (
		<CheckBoxGroupContext.Provider value={{ selected, setSelected }}>
			<div className={className} {...props}>
				{children}
			</div>
		</CheckBoxGroupContext.Provider>
	);
}
