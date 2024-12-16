declare type ProductDetailAPIResponse = {
  id: number;
  name: string;
  images: string;
  price: number;
  discount_price: number;
  rating: number;
  availability: boolean;
  release_date?: string | number;
  categories?: {
    id: number;
    name: string;
  }[];
  is_bestseller?: boolean;
  is_featured?: boolean;
  is_new_arrival?: boolean;
  is_popular?: boolean;
  description: string;
  specifications: {
    key: string;
    value: string;
  }[];
};
