"use client";

import {
  getOrdersAdmin,
  processDelivered,
  processOrder,
  cancelOrder,
} from "@/services/api/admin/order-op";
import { useEffect, useState } from "react";

export default function Orders() {
  const [orders, setOrders] = useState<OrderAdmin[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getOrdersAdmin();
        setOrders(data);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      }
    };
    fetchOrders();
  }, []);

  const handleAction = async (orderId: number, action: string) => {
    try {
      switch (action) {
        case "process":
          await processOrder(orderId);
          break;
        case "complete":
          await processDelivered(orderId);
          break;
        case "cancel":
          await cancelOrder(orderId);
          break;
        default:
          break;
      }
      const data = await getOrdersAdmin();
      setOrders(data);
    } catch (error) {
      console.error("Failed to process order:", error);
    }
  };

  const getStatusClass = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "delivering":
        return "bg-blue-100 text-blue-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  const formatStatus = (status: string) => {
    return status[0] + status.slice(1).toLowerCase();
  };
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Manage Orders</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2">Order ID</th>
              <th className="border px-4 py-2">Customer name</th>
              <th className="border px-4 py-2">Phone number</th>
              {/* For tracking delivery purpose */}
              <th className="border px-4 py-2">Tracking ID</th>
              <th className="border px-4 py-2">Total</th>
              <th className="border px-4 py-2">Payment Method</th>
              <th className="border px-4 py-2">Status</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="border px-4 py-2">{order.id}</td>

                <td
                  className={
                    order.customerName
                      ? "border px-4 py-2"
                      : "border px-4 py-2 text-gray-500 italic"
                  }
                >
                  {order.customerName || "NA"}
                </td>
                <td className="border px-4 py-2">{order.phoneNumber}</td>
                <td className="border px-4 py-2">{order.trackingID}</td>
                <td className="border px-4 py-2">
                  ${(order.total / 100).toFixed(2)}
                </td>
                <td className="border px-4 py-2">{order.paymentMethod}</td>
                <td
                  className={`border px-4 py-2 ${getStatusClass(order.status)}`}
                >
                  {formatStatus(order.status)}
                </td>
                <td className="border px-4 py-2">
                  {order.status.toLowerCase() === "pending" && (
                    <>
                      <button
                        onClick={() => handleAction(order.id, "process")}
                        className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                      >
                        Process
                      </button>
                      <button
                        onClick={() => handleAction(order.id, "cancel")}
                        className="bg-red-500 text-white px-2 py-1 rounded"
                      >
                        Cancel
                      </button>
                    </>
                  )}
                  {order.status.toLowerCase() === "delivering" && (
                    <button
                      onClick={() => handleAction(order.id, "complete")}
                      className="bg-green-500 text-white px-2 py-1 rounded"
                    >
                      Confirm delivery
                    </button>
                  )}
                  {order.status === "Delivered" && (
                    <span className="text-gray-500 italic">No actions</span>
                  )}
                  {order.status === "Cancelled" && (
                    <span className="text-gray-500 italic">Cancelled</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
