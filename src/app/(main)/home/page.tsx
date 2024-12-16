import BestDealSection from "@/components/BestDealSection";
import HomeCover from "@/components/HomeCover";
import NewArrivalSection from "@/components/NewArrivalSection";
import FeaturedProductSection from "@/components/FeaturedProductSection";

export default function Page() {
  return (
    <div className=" flex flex-col gap-12 px-24 ">
      <HomeCover />
      <FeaturedProductSection />
      <NewArrivalSection />
      <BestDealSection />
    </div>
  );
}
