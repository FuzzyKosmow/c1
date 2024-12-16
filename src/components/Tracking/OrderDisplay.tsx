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

const OrderDisplay = ({ order }: { order?: Order }) => {
  return (
    <>
      {order ? (
        <div className="mt-6 w-full max-w-lg bg-white p-6 rounded shadow-lg">
          <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">
            Order Details
          </h2>
          <div className="space-y-2 text-gray-700">
            <p>
              <span className="font-semibold">Order ID:</span> {order.id}
            </p>
            <p>
              <span className="font-semibold">Customer Name:</span>{" "}
              {order.customerName}
            </p>
            <p>
              <span className="font-semibold">Phone Number:</span>{" "}
              {order.phoneNumber}
            </p>
            <p>
              <span className="font-semibold">Total:</span> $
              {order.total.toFixed(2)}
            </p>
            <p>
              <span className="font-semibold">Status:</span> {order.status}
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
          </div>
          <h3 className="font-bold mt-4 text-gray-800">Items:</h3>
          <ul className="list-disc list-inside text-gray-700">
            {order.items.map((item) => (
              <li key={item.id}>
                {item.name} - {item.quantity} x ${item.price.toFixed(2)}
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
