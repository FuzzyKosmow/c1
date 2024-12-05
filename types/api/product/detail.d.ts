declare type ProductDetailAPIResponse = {
  id: number;
  name: string;
  image: string;
  gallery: string[];
  price: number;
  discount_price: number;
  rating: number;
  availability: boolean;
  storage: string[];
  storageModifiers: number[];
  colors: string[];
  release_date?: string | number;
  categories?: {
    id: number;
    name: string;
  }[];
  is_bestseller?: boolean;
  is_featured?: boolean;
  is_new_arrival?: boolean;
  description: string;
  specifications: {
    key: string;
    value: string;
  }[];
};
