import NavHeader from "@/components/NavHeader";

export default function Layout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
			<NavHeader />
			{children}
		</>
	);
}
