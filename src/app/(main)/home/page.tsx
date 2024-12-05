import BestDealSection from "@/components/BestDealSection";
import BestSellerSection from "@/components/BestSellerSection";
import HomeCover from "@/components/HomeCover";
import NewArrivalSection from "@/components/NewArrivalSection";
import PopularBrandSection from "@/components/PopularBrandSection";

export default function Page() {
	return (
		<div className=" flex flex-col gap-12 px-24 py-10">
			<HomeCover />
			<PopularBrandSection />
			<BestDealSection />
			<NewArrivalSection />
			<BestSellerSection />
		</div>
	);
}
