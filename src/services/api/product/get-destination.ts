import { API_URLS } from "@/config/api-urls";
export const getDestination = async (): Promise<Destination[]> => {
  const response = await fetch(API_URLS.product.getDestination);
  const data = await response.json();

  return data;
};
