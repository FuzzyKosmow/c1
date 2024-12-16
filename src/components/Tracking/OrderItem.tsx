"use client";

const OrderItemComponent = ({ order }: { order: OrderAdmin }) => {
  const formatStatus = (status: string) => {
    const statusColors: Record<string, string> = {
      pending: "text-yellow-500",
      shipping: "text-green-500",
      delivered: "text-blue-500",
    };
    return statusColors[status.toLowerCase()] || "text-red-500";
  };

  return (
    <div className="mt-6 w-full max-w-lg bg-white p-6 rounded shadow-lg">
      {/* Order Details */}
      <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">
        Order Details
      </h2>
      <div className="space-y-2 text-gray-700">
        <p>
          <span className="font-semibold">Order ID:</span> {order.id}
        </p>
        <p>
          <span className="font-semibold">Status:</span>{" "}
          <span className={formatStatus(order.status)}>{order.status}</span>
        </p>
        <p>
          <span className="font-semibold">Order Date:</span> {order.orderDate}
        </p>
        <p>
          <span className="font-semibold">Total:</span> $
          {order.total.toFixed(2)}
        </p>
        <p>
          <span className="font-semibold">Payment Method:</span>{" "}
          {order.paymentMethod}
        </p>
        <p>
          <span className="font-semibold">Shipping Method:</span>{" "}
          {order.shippingMethod}
        </p>
        <p>
          <span className="font-semibold">Shipping Fee:</span> $
          {order.shippingFee.toFixed(2)}
        </p>
        <p>
          <span className="font-semibold">Address:</span> {order.address}
        </p>
        <p>
          <span className="font-semibold">Phone Number:</span>{" "}
          {order.phoneNumber}
        </p>
      </div>

      {/* Order Items */}
      <h3 className="font-bold mt-6 text-gray-800">Items:</h3>
      <ul className="list-disc list-inside text-gray-700">
        {order.orderDetails.map((item) => (
          <li key={item.id}>
            <span className="font-semibold">Product ID:</span> {item.productId},{" "}
            <span className="font-semibold">Color:</span> {item.color},{" "}
            <span className="font-semibold">Storage:</span> {item.storage} (
            {item.storageModifier}GB), {item.quantity} x $
            {item.price.toFixed(2)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderItemComponent;
