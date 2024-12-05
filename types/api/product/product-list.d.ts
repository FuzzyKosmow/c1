declare type ProductListAPIOptions = {
  category?: string;
  keyword?: string;
  price_min?: number;
  price_max?: number;
  color?: string;
  storage?: string;
  sort?: string;
  page?: number;
  limit?: number;
};

declare type ProductListAPIResponse = {
  products: {
    id: number;
    name: string;
    image: string;
    price: number;
    discount_price: number;
    rating: number;
    availability: boolean;
    storage: string[];

    colors: string[];
    release_date?: string | number;
    categories?: {
      id: number;
      name: string;
    }[];
    is_bestseller?: boolean;
    is_featured?: boolean;
    is_new_arrival?: boolean;
  }[];
};
