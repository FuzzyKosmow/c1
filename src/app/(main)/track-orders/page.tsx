"use client";

import { useEffect, useState } from "react";
import { trackingOrder } from "@/services/api/order/trackOrder";
import { getOrdersFromCurrentUser } from "@/services/api/order/getOrdersFromCurrentUser";
import { isLoggedIn } from "@/services/api/auth/getCurrentUserInfo";
import OrderLookup from "@/components/Tracking/OrderLookUp";
import OrderList from "@/components/Tracking/OrderList";
import OrderDisplay from "@/components/Tracking/OrderDisplay";
interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

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

export default function Page() {
  const [orders, setOrders] = useState<OrderAdmin[]>([]);
  const [order, setOrder] = useState<Order | null>(null);
  const [filter, setFilter] = useState<string>("All");
  const [loggedIn, setIsLoggedIn] = useState<boolean>(true);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    const fetchOrders = async () => {
      const res = await getOrdersFromCurrentUser();
      setOrders(res);
    };

    const checkLoggedIn = async () => {
      const res = await isLoggedIn();
      setIsLoggedIn(res);
      if (res) fetchOrders();
    };

    checkLoggedIn();
  }, []);

  const handleFilterChange = (status: string) => {
    setFilter(status);
  };

  const filteredOrders =
    filter === "All"
      ? orders
      : orders.filter(
          (order) =>
            order.status.toLocaleLowerCase() === filter.toLocaleLowerCase()
        );

  return (
    <div className="flex flex-col items-center  bg-cover bg-center min-h-screen">
      <div className="bg-white bg-opacity-80 p-8 rounded-lg shadow-lg w-full max-w-4xl">
        {loggedIn ? (
          <OrderList
            orders={filteredOrders}
            filter={filter}
            onFilterChange={handleFilterChange}
          />
        ) : (
          <div>
            {message && (
              <p className="text-red-500 font-medium text-center mb-4">
                {message}
              </p>
            )}
            <div className="flex flex-row gap-5 w-full">
              <OrderLookup onOrderFound={setOrder} setMessage={setMessage} />
              <OrderDisplay order={order} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
