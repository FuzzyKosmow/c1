import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				background: "var(--background)",
				foreground: "var(--foreground)",
				black: {
					100: "#BCBABA",
					200: "#949292",
					300: "#6C6B6B",
					400: "#444343",
					500: "#1C1C1C",
				},
				secondary: {
					100: "#FAFAFA",
					200: "#F2F2F2",
					300: "#E0E0E0",
					400: "#BDBDBD",
					500: "#9E9E9E",
				},
				success: "#12B76A",
				danger: "#F04438",
				warn: "#F79009",
			},
			
		},
	},
	plugins: [],
};
export default config;
