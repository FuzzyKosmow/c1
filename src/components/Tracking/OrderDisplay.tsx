interface Order {
  id: string;
  customerName: string;
  phoneNumber: string;
  total: number;
  tax: number;
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

const OrderDisplay = ({ order }: { order?: Order }) => {
  const formatMoney = (amount: number) => {
    // To vnd
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };
  return (
    <>
      {order ? (
        <div className="mt-6 w-full max-w-lg bg-white p-6 rounded shadow-lg">
          {/* Header */}
          <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">
            Order Detail
          </h2>

          {/* Order Details */}
          <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-gray-700">
            <div className="font-medium text-gray-600">Order ID:</div>
            <div>{order.id}</div>

            <div className="font-medium text-gray-600">Customer Name:</div>
            <div>{order.customerName}</div>

            <div className="font-medium text-gray-600">Phone Number:</div>
            <div>{order.phoneNumber}</div>
            <div className="font-medium text-gray-600">Tax:</div>
            <div>
              {formatMoney(order.tax)}{" "}
              <span className="text-gray-500">(10%)</span>
            </div>
            <div className="font-medium text-gray-600">Total:</div>
            <div>
              {formatMoney(order.total)}{" "}
              <span className="text-gray-500">
                ({order.items.length} items)
              </span>
            </div>

            <div className="font-medium text-gray-600">Status:</div>
            <div>{order.status}</div>

            <div className="font-medium text-gray-600">Shipping Method:</div>
            <div>{order.shippingMethod}</div>

            <div className="font-medium text-gray-600">Shipping Fee:</div>
            <div>${order.shippingFee.toFixed(2)}</div>

            <div className="font-medium text-gray-600">Address:</div>
            <div>{order.address}</div>
          </div>

          {/* Divider */}
          <hr className="my-6 border-gray-300" />

          {/* Order Items */}
          <h3 className="text-lg font-bold text-gray-800 mb-2">Items:</h3>
          <ul className="space-y-4 text-gray-700">
            {order.items.map((item) => (
              <li
                key={item.id}
                className="border p-3 rounded bg-gray-50 shadow-sm"
              >
                <div>
                  <span className="font-medium text-gray-600">Name:</span>{" "}
                  {item.name}
                </div>
                <div>
                  <span className="font-medium text-gray-600">Quantity:</span>{" "}
                  {item.quantity}
                </div>
                <div>
                  <span className="font-medium text-gray-600">Price:</span> $
                  {item.price.toFixed(2)}
                </div>
                <div>
                  <span className="font-medium text-gray-600">Subtotal:</span> $
                  {(item.price * item.quantity).toFixed(2)}
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="text-center text-2xl font-bold w-full">
          No order found
        </div>
      )}
    </>
  );
};

export default OrderDisplay;
