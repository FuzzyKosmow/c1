// Sample a single order object
// {
// 		"id": 1,
// 		"userId": "f3dd1ce5-9161-4c7e-977c-6447da493a95",
// 		"customerName": "",
// 		"orderDate": "2024-11-21T10:52:13.2809182",
// 		"status": "Pending",
// 		"paymentMethod": "Credit Card",
// 		"province": "Ontario",
// 		"district": "Toronto",
// 		"address": "1234 Main St",
// 		"phoneNumber": "1234567890",
// 		"shippingMethod": "Standard",
// 		"shippingFee": 20000.00,
// 		"trackingID": "TIHC8C3",
// 		"tax": 6933600.00,
// 		"cardNumber": "1234567890123456",
// 		"cardHolder": "John Doe",
// 		"cardExpireDate": "12/25",
// 		"cardCvv": "123",
// 		"promoCodeApplied": null,
// 		"promoCodeDiscount": null,
// 		"subTotal": 69336000.0000,
// 		"total": 76289600.0000,
// 		"orderDetails": [
// 			{
// 				"id": 1,
// 				"orderId": 1,
// 				"productId": 3,
// 				"quantity": 2,
// 				"price": 28890000.00,
// 				"color": "Blue",
// 				"storage": "512GB",
// 				"storageModifier": 1.20,
// 				"order": null,
// 				"product": null
// 			}
// 		]
// 	},

declare interface OrderAdmin {
  id: number;
  userId: string;
  customerName: string;
  orderDate: string;
  status: string;
  paymentMethod: string;
  province: string;
  district: string;
  address: string;
  phoneNumber: string;
  shippingMethod: string;
  shippingFee: number;
  trackingID: string;
  tax: number;
  cardNumber: string;
  cardHolder: string;
  cardExpireDate: string;
  cardCvv: string;
  promoCodeApplied: string;
  promoCodeDiscount: string;
  subTotal: number;
  total: number;
  orderDetails: OrderDetails[];
}

declare interface OrderDetails {
  id: number;
  orderId: number;
  productId: number;
  quantity: number;
  price: number;
  color: string;
  storage: string;
  storageModifier: number;
}
