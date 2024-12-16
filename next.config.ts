import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    //Cloudinary
    domains: [
      "res.cloudinary.com",
      "cdn11.bigcommerce.com",
      "thumbs.dreamstime.com",
    ],
  },
};

export default nextConfig;
