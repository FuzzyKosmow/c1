declare interface IProduct {
  id: number;
  name: string;
  image: string;
  price: number;
  discount_price: number;
  rating: number;
  availability: boolean;
  categories: ICategory[];
}

declare interface ICategoryDTO {
  id: number;
  name: string;
  image: string;
  description: string;
  isPopular: boolean;
}

declare interface IAdminProduct {
  id: number;
  name: string;
  images: string[];
  price: number;
  discountPrice: number;
  rating: number;
  availability: boolean;
  country: string;
  relatedCity: string;
  categories: ICategoryDTO[];
  stock: number;
  importPrice: number;
  description: string;
  isBestSeller: boolean;
  isFeatured: boolean;
  isPopular: boolean;
  isNewArrival: boolean;
  releaseDate: string;
}

declare interface UpsertProductDTO {
  name: string;
  price: number;
  discountPrice: number;
  rating: number;
  country: string;
  relatedCity: string;
  availability: boolean;
  importPrice: number;
  images: string[];
  description: string;
  isBestSeller: boolean;
  isFeatured: boolean;
  isPopular: boolean;
  isNewArrival: boolean;
  releaseDate: string;
  categoryIds: number[];
}
