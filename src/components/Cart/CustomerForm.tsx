import { useState } from "react";

interface CustomerFormProps {
  customerDetails: CustomerDetails | null;
  setCustomerDetails: (details: CustomerDetails) => void;
  onNext: () => void;
  onBack: () => void;
}

function CustomerForm({
  customerDetails,
  setCustomerDetails,
  onNext,
  onBack,
}: CustomerFormProps) {
  const [customer, setCustomer] = useState<CustomerDetails>(
    customerDetails || {
      name: "",
      phoneNumber: "",
      email: "",
    }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCustomer((prev) => ({ ...prev, [name]: value }));
    const prev = { ...customer, [name]: value };
    setCustomerDetails(prev);
  };

  const handleNext = () => {
    setCustomerDetails(customer);
    onNext();
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-md mx-auto">
      <h3 className="text-2xl font-semibold mb-6">Customer Information</h3>

      {/* Customer Name */}
      <input
        name="name"
        value={customer.name}
        onChange={handleChange}
        placeholder="Customer Name"
        className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
      />

      {/* Phone Number */}
      <input
        name="phoneNumber"
        value={customer.phoneNumber}
        onChange={handleChange}
        placeholder="Phone Number"
        className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
      />

      {/* Email */}
      <input
        name="email"
        value={customer.email}
        onChange={handleChange}
        placeholder="Email"
        className="w-full p-3 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
      />

      {/* Next and Back Buttons */}
      <div className="flex justify-between items-center">
        <button
          onClick={handleNext}
          className="bg-black-500 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition"
        >
          Next
        </button>
        <button
          onClick={onBack}
          className="mt-4 text-gray-500 underline hover:text-gray-700 ml-2 focus:outline-none"
        >
          Back
        </button>
      </div>
    </div>
  );
}

export default CustomerForm;
