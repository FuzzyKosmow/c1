"use client";

import { trackingOrder } from "@/services/api/order/trackOrder";
import { useState } from "react";

interface Order {
  id: string;
  customerName: string;
  phoneNumber: string;
  total: number;
  status: string;
  items: OrderItem[];
  shippingMethod: string;
  shippingFee: number;
  address: string;
}
interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}
const OrderLookup = ({
  onOrderFound,
  setMessage,
}: {
  onOrderFound: (order: Order | null) => void;
  setMessage: (message: string) => void;
}) => {
  const [trackingId, setTrackingId] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");

  const handleSubmit = async () => {
    try {
      const res = await trackingOrder({
        trackingId,
        phoneNumber,
      });

      const apiOrder = res;
      const mappedOrder: Order = {
        id: apiOrder.id.toString(),
        customerName: apiOrder.customerName,
        phoneNumber: apiOrder.phoneNumber,
        total: apiOrder.total,
        status: apiOrder.status,
        shippingMethod: apiOrder.shippingMethod,
        shippingFee: apiOrder.shippingFee,
        address: apiOrder.address,
        items: apiOrder.orderDetails.map((detail: any) => ({
          id: detail.id.toString(),
          name: detail.product.name,
          quantity: detail.quantity,
          price: detail.price,
        })),
      };
      setMessage("");
      onOrderFound(mappedOrder);
    } catch (error) {
      setMessage("Order not found");
      onOrderFound(null);
    }
  };

  return (
    <div className="w-1/2 justify-start max-w-lg bg-white p-6 rounded shadow-lg">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800 text-center">
        Track Your Order
      </h2>
      <p className="text-sm text-gray-600 mb-6 text-center">
        Enter your Tracking ID and Phone Number to view order details.
      </p>
      <div className="mb-4">
        <label
          className="block text-gray-700 font-medium mb-2"
          htmlFor="trackingId"
        >
          Tracking ID
        </label>
        <input
          id="trackingId"
          type="text"
          placeholder="Enter Tracking ID"
          value={trackingId}
          onChange={(e) => setTrackingId(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-6">
        <label
          className="block text-gray-700 font-medium mb-2"
          htmlFor="phoneNumber"
        >
          Phone Number
        </label>
        <input
          id="phoneNumber"
          type="text"
          placeholder="Enter Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <button
        onClick={handleSubmit}
        className="w-full py-3 bg-black-500 text-white font-semibold rounded hover:bg-gray-6    00 transition-colors"
      >
        Track Order
      </button>
    </div>
  );
};
export default OrderLookup;
