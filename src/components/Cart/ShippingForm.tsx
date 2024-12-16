import { useState } from "react";

// Address Form Component
interface ShippingFormProp {
  shippingAddress: Address | null;
  setShippingAddress: (address: Address) => void;
  shippingMethod: string;
  setShippingMethod: (method: string) => void;
  setShippingFee: (fee: number) => void;
  onNext: () => void;
  onBack: () => void;
}

function ShippingForm({
  shippingAddress,
  setShippingAddress,
  shippingMethod,
  setShippingMethod,
  setShippingFee,
  onNext,
  onBack,
}: ShippingFormProp) {
  const [address, setAddress] = useState<Address>(
    shippingAddress || {
      province: "",
      district: "",
      address: "",
    }
  );

  const shippingOptions = [
    { name: "Standard Shipping", value: "Standard", price: 20000 },
    { name: "Express Shipping", value: "Fast", price: 40000 },
    { name: "Super Fast Shipping", value: "SuperFast", price: 60000 },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddress((prev) => ({ ...prev, [name]: value }));
    const prev = { ...address, [name]: value };
    setShippingAddress(prev);
  };

  const handleNext = () => {
    setShippingAddress(address);

    onNext();
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-md mx-auto">
      <div>
        <h3 className="text-2xl font-semibold mb-6">Shipping Information</h3>
        <div className="flex mb-4 gap-4">
          <input
            name="province"
            value={address.province}
            onChange={handleChange}
            placeholder="Province"
            className="w-1/2 p-2 border border-gray-300 rounded focus:outline-none focus:border-black"
          />
          <input
            name="district"
            value={address.district}
            onChange={handleChange}
            placeholder="District"
            className="w-1/2 p-2 border border-gray-300 rounded focus:outline-none focus:border-black"
          />
        </div>
        <input
          name="address"
          value={address.address}
          onChange={handleChange}
          placeholder="Address"
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-black mb-6"
        />
      </div>

      <div>
        <h3 className="text-2xl font-semibold mb-4">Delivery Option</h3>
        {shippingOptions.map((option) => (
          <label
            key={option.value}
            className="flex justify-between items-center p-3 mb-3 border border-gray-300 rounded-lg hover:bg-gray-100 transition cursor-pointer"
          >
            <div className="flex items-center">
              <input
                type="radio"
                name="shipping"
                value={option.value}
                checked={shippingMethod === option.value}
                onChange={() => {
                  setShippingMethod(option.value);
                  setShippingFee(option.price);
                }}
                className="mr-3 w-4 h-4"
              />
              <span className="font-medium">{option.name}</span>
            </div>
            <span className="text-gray-600 font-medium">
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "VND",
              }).format(option.price)}
            </span>
          </label>
        ))}
      </div>

      <div className="mt-6 flex justify-between items-center">
        <button
          onClick={onBack}
          className="text-gray-500 underline hover:text-gray-700"
        >
          Back
        </button>
        <button
          onClick={handleNext}
          className="bg-black-500 text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default ShippingForm;
