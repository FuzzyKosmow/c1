"use client";

import { useEffect, useState } from "react";
import { HiChevronDown, HiChevronRight } from "react-icons/hi";
import { getDestination } from "@/services/api/product/get-destination";
import { getCategoriesAPI } from "@/services/api/product/product-list";
import { useRouter } from "next/navigation";
import { get } from "http";
const HomeSideBar = () => {
  const [expandedCountry, setExpandedCountry] = useState<string | null>(null);
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [categories, setCategories] = useState<ICategoryDTO[]>([]);
  const router = useRouter();
  useEffect(() => {
    const fetchData = async () => {
      getDestination().then((response) => {
        setDestinations(response);
      });
      getCategoriesAPI().then((response) => {
        console.log("response", response);
        setCategories(response);
      });
    };
    fetchData();
  }, []);
  const toggleCountry = (country: string) => {
    setExpandedCountry(expandedCountry === country ? null : country);
  };

  // On related city click, it will redirect to the /product-list with filter

  const handleCityClick = (city: string) => {
    // Redirect to product list page with filter
    // router.push(`/souvenir?relatedCity=${city}`);

    router.replace("souvenir?relatedCity=" + city);
  };

  const handleCategoryClick = (category: string) => {
    console.log("big cat", category);
    router.replace("souvenir?category=" + category);
  };

  return (
    <div className="h-full w-64 bg-gray-50 shadow-lg flex flex-col transition-all duration-300 z-50 border-r">
      {/* Header */}
      <div className="p-4 bg-orange-500 text-white font-bold text-lg">
        Destinations
      </div>

      {/* Country and City List */}
      <div className="p-4">
        {destinations.map((destination) => (
          <div key={destination.country} className="mb-4">
            <div
              className="flex justify-between items-center cursor-pointer py-2 px-3 rounded-md bg-gray-100 hover:bg-gray-200"
              onClick={() => toggleCountry(destination.country)}
            >
              <span className="font-semibold text-gray-800">
                {destination.country}
              </span>
              {expandedCountry === destination.country ? (
                <HiChevronDown className="text-gray-600" />
              ) : (
                <HiChevronRight className="text-gray-600" />
              )}
            </div>
            {expandedCountry === destination.country && (
              <ul className="ml-6 mt-2 border-l border-orange-300 pl-3">
                {destination.cities.map((city) => (
                  <li
                    onClick={() => handleCityClick(city)}
                    key={city}
                    className="text-gray-600 py-1 hover:text-orange-500 cursor-pointer"
                  >
                    {city}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>

      {/* Popular Categories Section */}
      <div className="p-4 bg-orange-500 text-white font-bold text-lg">
        Popular Categories
      </div>
      <div className="p-4">
        {categories && categories.length > 0 ? (
          categories.map((category) => (
            <div
              key={category.id}
              onClick={() => handleCategoryClick(category.name)}
              className="text-gray-600 py-1 hover:text-orange-500 cursor-pointer"
            >
              {category.name}
            </div>
          ))
        ) : (
          <div className="text-gray-500">No categories available</div>
        )}

        <div className="text-orange-500 mt-2 cursor-pointer hover:underline">
          View All
        </div>
      </div>
    </div>
  );
};

export default HomeSideBar;
