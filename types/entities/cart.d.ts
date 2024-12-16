declare interface Address {
  province: string;
  district: string;
  address: string;
}
declare interface PaymentDetails {
  cardHolder: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
}

declare interface CustomerDetails {
  name: string;
  email: string;
  phoneNumber: string;
}
declare interface CartProductDetails {
  id: number;
  name: string;
  price: number;
  discount_price: number;
  colors: string[];
  storage: string[];
  storageModifiers: number[];
  rating: number;
  images: string[];
}
