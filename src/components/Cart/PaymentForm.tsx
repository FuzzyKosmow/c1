import { useState } from "react";

// Payment Form Component
interface PaymentFormProps {
  paymentDetails: PaymentDetails | null;
  setPaymentDetails: (details: PaymentDetails) => void;
  paymentMethod: string;
  setPaymentMethod: (method: string) => void;
  onSubmit: () => void;
  onBack: () => void;
}

export default function PaymentForm({
  paymentMethod,
  setPaymentMethod,
  paymentDetails,
  setPaymentDetails,
  onSubmit,
  onBack,
}: PaymentFormProps) {
  const [payment, setPayment] = useState<PaymentDetails>(
    paymentDetails || {
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      cardHolder: "",
    }
  );
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<string>(paymentMethod);

  const paymentOptions = [
    { name: "Cash", value: "Cash" },
    { name: "Credit Card", value: "CreditCard" },
    { name: "Visa", value: "Visa" },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPayment((prev) => ({ ...prev, [name]: value }));
    const prev = { ...payment, [name]: value };
    setPaymentDetails(prev);
  };

  const handlePaymentMethodChange = (value: string) => {
    setSelectedPaymentMethod(value);
    setPaymentMethod(value);
    if (value === "Cash") {
      setPayment({
        cardNumber: "",
        expiryDate: "",
        cvv: "",
        cardHolder: "",
      });
    }
  };

  const handleSubmit = () => {
    // If method is cash, set payment details to empty
    if (selectedPaymentMethod === "Cash") {
      setPaymentDetails({
        cardNumber: "",
        expiryDate: "",
        cvv: "",
        cardHolder: "",
      });
      setPaymentMethod(selectedPaymentMethod);
      onSubmit();
      return;
    } else if (
      !payment.cardNumber ||
      !payment.expiryDate ||
      !payment.cvv ||
      !payment.cardHolder
    ) {
      return;
    }
    setPaymentMethod(selectedPaymentMethod);
    setPaymentDetails(payment);
    onSubmit();
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-md mx-auto">
      <h3 className="text-2xl font-semibold mb-6">Payment Information</h3>

      {/* Payment Method Options */}
      <div className="mb-6">
        <label className="block mb-2 text-lg font-medium">
          Payment Method:
        </label>
        <div className="flex gap-4">
          {paymentOptions.map((option) => (
            <button
              key={option.value}
              className={`p-3 border rounded-lg focus:outline-none transition-colors ${
                selectedPaymentMethod === option.value
                  ? "border-black-500 bg-gray-100"
                  : "border-gray-300"
              }`}
              onClick={() => handlePaymentMethodChange(option.value)}
            >
              {option.name}
            </button>
          ))}
        </div>
      </div>

      {/* Conditional Rendering: Show inputs only if payment method is not "Cash" */}
      {selectedPaymentMethod !== "Cash" ? (
        <>
          <input
            name="cardHolder"
            value={payment.cardHolder}
            onChange={handleChange}
            placeholder="Card Holder"
            className="w-full p-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
          />
          <input
            name="cardNumber"
            value={payment.cardNumber}
            onChange={handleChange}
            placeholder="Card Number"
            className="w-full p-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
          />
          <div className="flex gap-4 mb-4">
            <input
              name="expiryDate"
              value={payment.expiryDate}
              onChange={handleChange}
              placeholder="Expiry Date (MM/YY)"
              className="w-1/2 p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
            />
            <input
              name="cvv"
              value={payment.cvv}
              onChange={handleChange}
              placeholder="CVV"
              className="w-1/2 p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
            />
          </div>
        </>
      ) : (
        <p className="text-gray-600 mb-4">
          You have selected to pay with cash on delivery.
        </p>
      )}

      {/* Submit and Back Buttons */}

      <div className="flex justify-between items-center">
        <button
          onClick={onBack}
          className="mt-4 text-gray-500 underline hover:text-gray-700 mr-4"
        >
          Back
        </button>
        <button
          onClick={handleSubmit}
          // To the right side
          className="bg-black-500 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition "
        >
          Submit Order
        </button>
      </div>
    </div>
  );
}
