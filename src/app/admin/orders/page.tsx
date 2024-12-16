"use client";

import {
  getOrdersAdmin,
  processDelivered,
  processOrder,
  cancelOrder,
} from "@/services/api/admin/order-op";
import { useEffect, useState } from "react";
import Pagination from "@/components/Pagination";

export default function Orders() {
  const [orders, setOrders] = useState<OrderAdmin[]>([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPage, setTotalPage] = useState(0);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getOrdersAdmin();
        setOrders(data.orders);
        setTotalPage(Math.ceil(data.total / limit));
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      }
    };
    fetchOrders();
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getOrdersAdmin({
          page,
          limit,
        });
        setOrders(data.orders);
        setTotalPage(Math.ceil(data.total / limit));
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      }
    };
    fetchOrders();
  }, [page, limit]);

  const handleLimitChange = (newLimit: number) => {
    setLimit(newLimit);
    setPage(1); // Reset page to 1 when limit changes
  };

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
      const data = await getOrdersAdmin({ page, limit });
      setOrders(data.orders);
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

  const handlePrint = (order: OrderAdmin) => {
    const formatStatus = (status: string) => {
      const statusColors: Record<string, string> = {
        pending: "text-yellow-500",
        shipping: "text-green-500",
        delivered: "text-blue-500",
      };
      return statusColors[status.toLowerCase()] || "text-red-500";
    };

    const printContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; background-color: #fff; padding: 20px; border-radius: 8px; border: 1px solid #ddd;">
      <h2 style="text-align: center; color: #333; margin-bottom: 24px; font-size: 24px; font-weight: bold;">Order Details</h2>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; color: #555;">
        <div style="font-weight: bold; color: #666;">Order ID:</div>
        <div>${order.id}</div>

        <div style="font-weight: bold; color: #666;">Status:</div>
        <div style="${formatStatus(order.status)}">${order.status}</div>

        <div style="font-weight: bold; color: #666;">Order Date:</div>
        <div>${order.orderDate}</div>

        <div style="font-weight: bold; color: #666;">Total:</div>
        <div>$${order.total.toFixed(2)}</div>

        <div style="font-weight: bold; color: #666;">Payment Method:</div>
        <div>${order.paymentMethod}</div>

        <div style="font-weight: bold; color: #666;">Shipping Method:</div>
        <div>${order.shippingMethod}</div>

        <div style="font-weight: bold; color: #666;">Shipping Fee:</div>
        <div>$${order.shippingFee.toFixed(2)}</div>

        <div style="font-weight: bold; color: #666;">Address:</div>
        <div>${order.address}</div>

        <div style="font-weight: bold; color: #666;">Phone Number:</div>
        <div>${order.phoneNumber}</div>
      </div>

      <hr style="margin: 24px 0; border: none; border-top: 1px solid #ddd;" />

      <h3 style="font-size: 20px; font-weight: bold; color: #333; margin-bottom: 16px;">Items:</h3>
      <ul style="list-style: none; padding: 0; margin: 0;">
        ${order.orderDetails
          .map(
            (item) => `
          <li style="padding: 12px; margin-bottom: 12px; border: 1px solid #ddd; border-radius: 6px; background-color: #f9f9f9;">
            <div><strong style="color: #666;">Name:</strong> ${
              item.product.name
            }</div>
            <div><strong style="color: #666;">Quantity:</strong> ${
              item.quantity
            }</div>
            <div><strong style="color: #666;">Price:</strong> $${item.price.toFixed(
              2
            )}</div>
            <div><strong style="color: #666;">Subtotal:</strong> $${(
              item.price * item.quantity
            ).toFixed(2)}</div>
          </li>
        `
          )
          .join("")}
      </ul>
    </div>
  `;

    const newWindow = window.open("", "_blank");
    newWindow.document.write(`
    <html>
      <head>
        <title>Print Order</title>
        <style>
          body { background-color: #f8f9fa; padding: 20px; font-family: Arial, sans-serif; }
        </style>
      </head>
      <body>
        ${printContent}
      </body>
    </html>
  `);
    newWindow.document.close();
    newWindow.print();
  };
  const formatMoney = (amount: number) => {
    // To VND
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
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
                <td className="border px-4 py-2">{order.trackingID || "NA"}</td>
                <td className="border px-4 py-2">{formatMoney(order.total)}</td>
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
                        className="bg-red-500 text-white px-2 py-1 rounded mr-2"
                      >
                        Cancel
                      </button>
                    </>
                  )}
                  {order.status.toLowerCase() === "delivering" && (
                    <button
                      onClick={() => handleAction(order.id, "complete")}
                      className="bg-green-500 text-white px-2 py-1 rounded mr-2"
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
                  <button
                    onClick={() => handlePrint(order)}
                    className="bg-gray-500 text-white px-2 py-1 rounded"
                  >
                    Print
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 align-bottom">
        <Pagination
          currentPage={page}
          totalPages={totalPage}
          onPageChange={(page) => setPage(page)}
          onItemsPerPageChange={handleLimitChange}
          itemsPerPage={limit}
        />
      </div>
    </div>
  );
}
