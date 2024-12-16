import OrderItemComponent from "./OrderItem";

const OrderList = ({
  orders,
  filter,
  onFilterChange,
}: {
  orders: OrderAdmin[];
  filter: string;
  onFilterChange: (status: string) => void;
}) => {
  const filterButtons = [
    { label: "Pending", value: "Pending" },
    { label: "Delivering", value: "Shipping" },
    { label: "Delivered", value: "Delivered" },
  ];

  return (
    <div>
      {/* Filter Buttons */}
      <div className="mb-4 flex space-x-2">
        {filterButtons.map(({ label, value }) => (
          <button
            key={value}
            onClick={() => onFilterChange(value)}
            className={`px-4 py-2 rounded transition ${
              filter === value
                ? "bg-black-500 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Order List */}
      <div className="flex flex-col items-center space-y-4">
        {orders.map((order) => (
          <OrderItemComponent key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
};

export default OrderList;
