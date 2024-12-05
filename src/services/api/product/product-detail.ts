export async function getProductDetailAPI(productId: string) {
  // Mock data cho chi tiết sản phẩm
  const url = "http://localhost:5100/api/products/" + productId;
  const response = await fetch(url);
  const data = await response.json();
  return data;
  // return mockData;
}
const mockData = {
  id: 2,
  name: "Iphone 15 Plus 512GB",
  price: 30890000.0,
  discount_price: 0.0,
  images: [
    "https://res.cloudinary.com/de0lj9ydr/image/upload/v1729943047/phones/hnlcxkzfry9acrntg3fm.jpg",
    "https://res.cloudinary.com/de0lj9ydr/image/upload/v1729943047/phones/jda4h9zgfxarw86dg69e.jpg",
  ],
  colors: ["White", "Green", "Yellow"],
  storage: ["128GB", "256GB", "512GB"],
  storageModifiers: [1.0, 1.1, 1.2],
  specifications: {
    "Operating System": "iOS 17",
    "Mobile Network": "2G, 3G, 4G, 5G",
    "Internal Storage": "256GB",
    "Camera Resolution": "Main Camera: 48MP / f1.6 aperture",
    "SIM Slots": "Dual SIM (nano-SIM and eSIM)",
    Processor: "Apple A16 Bionic",
    "Display Technology": "Super Retina XDR",
    Resolution: "2796 x 1290",
    "Screen Size": "6.7 inches",
  },
  description:
    "Maintaining the modern square design similar to its predecessors, the iPhone 15 Plus is a perfect choice for users who want a balanced size. It’s not too small like the iPhone 15 or overly expensive like the iPhone 15 Pro Max. Additionally, it comes in three storage options: 128GB/256GB/512GB, offering a wide range of choices for iPhone users.",
  rating: 4.5,
  categories: [
    { id: 6, name: "Android" },
    { id: 7, name: "iOS" },
  ],
  is_bestseller: false,
  is_featured: false,
  is_new_arrival: true,
  release_date: "0001-01-01T00:00:00",
};
