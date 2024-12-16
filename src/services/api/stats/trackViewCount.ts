import { API_URLS } from "@/config/api-urls";
import axios from "axios";
export async function increaseViewCount(siteName: string) {
  const response = await axios.post(
    API_URLS.stats.increaseCount.replace("{siteName}", siteName),
    {}
  );
  console.log(
    "called api url: ",
    API_URLS.stats.increaseCount.replace("{siteName}", siteName)
  );
  return response.data;
}
