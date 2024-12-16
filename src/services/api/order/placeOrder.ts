import useAuthStore from "@/stores/auth.store";
import { API_URLS } from "@/config/api-urls";

// Place order props
interface PlaceOrderProps {
  shippingAddress: Address;
  customerDetails: CustomerDetails;
  paymentDetails: PaymentDetails;
  paymentMethod: string;
  shippingMethod: string;
  productDetails: CartProductDetails;

  PromoCodeApplied?: string;
}

const placeOrder = ({
  shippingAddress,
  customerDetails,
  paymentDetails,
  paymentMethod,
  shippingMethod,
  productDetails,

  PromoCodeApplied,
}: PlaceOrderProps) => {
  const authToken = useAuthStore.getState().token;
  const orderGeneral = {
    province: shippingAddress?.province || "",
    district: shippingAddress?.district || "",
    address: shippingAddress?.address || "",
    phoneNumber: customerDetails.phoneNumber,
    paymentMethod,
    shippingMethod,
    cardHolder: paymentDetails?.cardHolder || "",
    cardNumber: paymentDetails?.cardNumber || "",
    cardExpiry: paymentDetails?.expiryDate || "",
    cardCvv: paymentDetails?.cvv || "",
    customerName: customerDetails.name,
    PromoCodeApplied: PromoCodeApplied !== "" ? PromoCodeApplied : null,
  };

  const orderDetails = {
    productId: productDetails?.id || 0,
    quantity: 1,
  };

  const order = { ...orderGeneral, orderDetails: [orderDetails] };
  console.log("Orders", JSON.stringify(order));
  // Sending:
  console.log("Auth token", authToken);
  const res = fetch(API_URLS.cart.createOrder, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
    body: JSON.stringify(order),
  }).then((res) => res.json());
  return res;
};

export default placeOrder;
