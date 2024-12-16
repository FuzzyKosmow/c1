"use client";

import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { motion } from "framer-motion"; // Import motion from framer-motion
import ShippingForm from "./Cart/ShippingForm";
import PaymentForm from "./Cart/PaymentForm";
import CartView from "./Cart/CartProductView";
import CustomerForm from "./Cart/CustomerForm";
import useAuthStore from "@/stores/auth.store";
import placeOrder from "@/services/api/order/placeOrder";
import getPromoCodeValue from "@/services/api/order/getPromoValue";
import canUsePromoCode from "@/services/api/order/canUsePromoCode";
import SuccessOrderView from "./Cart/SuccessOrderView";
import Confetti from "react-confetti";

// Define the prop types for the CartModal component
interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Define the types for different steps of the checkout process
type StepType = 1 | 2 | 3 | 4 | 5;

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartModal({ isOpen, onClose }: CartModalProps) {
  const [showConfetti, setShowConfetti] = useState<boolean>(false);

  const [step, setStep] = useState<StepType>(1);
  const [productDetails, setProductDetails] =
    useState<CartProductDetails | null>(null);
  const [loadingProduct, setLoadingProduct] = useState<boolean>(false);
  // Customer details state
  const [customerDetails, setCustomerDetails] = useState<CustomerDetails>({
    name: "",
    email: "",
    phoneNumber: "",
  });

  // Product selection states

  const [promoCode, setPromoCode] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [discountAmount, setDiscountAmount] = useState<number>(0);
  const [discountPercentage, setDiscountPercentage] = useState<number>(0); // From 0 -> 1
  const [promoCodeNotif, setPromoCodeNotif] = useState<string>("");
  // Shipping and address states
  const [shippingAddress, setShippingAddress] = useState<Address>({
    province: "",
    district: "",
    address: "",
  });

  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails>({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardHolder: "",
  });
  // Payment method and info state
  const [paymentMethod, setPaymentMethod] = useState<string>("CreditCard");
  const [shippingMethod, setShippingMethod] = useState<string>("Standard");

  const [promoCodeError, setPromoCodeError] = useState<string>("");
  const [validationError, setValidationError] = useState<string>("");

  const [subtotal, setSubtotal] = useState<number>(0);
  const [shipping, setShipping] = useState<number>(0);
  const [tax, setTax] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);

  const nextStep = () => {
    if (!isStepValid()) return;
    setValidationError("");
    setStep((prevStep) => (prevStep + 1) as StepType);
  };

  const prevStep = () => setStep((prevStep) => (prevStep - 1) as StepType);

  const isStepValid = (): boolean => {
    if (step === 1 && (!quantity || quantity < 1)) {
      setValidationError("Please provide quantity.");

      console.log("Invalid product options");
      return false;
    }
    if (step === 2 && !checkCustomer(customerDetails)) {
      console.log("Invalid customer");
      return false;
    }
    if (step === 3 && !checkAddress(shippingAddress)) {
      console.log("Invalid address");
      return false;
    }
    if (step === 4 && !checkPayment(paymentDetails)) {
      console.log("Invalid payment");
      return false;
    }

    return true;
  };

  const checkAddress = (address: Address | null) => {
    if (!address) {
      setValidationError("Please provide shipping address.");
      return false;
    }
    if (!address.province || !address.district || !address.address) {
      setValidationError("Please provide shipping address.");
      return false;
    }
    return true;
  };
  const checkPayment = (payment: PaymentDetails | null) => {
    if (paymentMethod === "Cash") return true;

    if (!payment) return false;

    if (
      !payment.cardNumber ||
      !payment.expiryDate ||
      !payment.cvv ||
      !payment.cardHolder
    ) {
      setValidationError("Please provide payment details.");
      return false;
    }
    return true;
  };
  const checkCustomer = (customer: CustomerDetails) => {
    if (!customer) {
      setValidationError("Please provide customer details.");
      return false;
    }
    if (!customer.name || !customer.email || !customer.phoneNumber) {
      setValidationError("Please provide customer details.");
      return false;
    }
    return true;
  };

  // Call on open and close modal
  useEffect(() => {
    const fetchCart = async () => {
      const cart = localStorage.getItem("cart");
      if (cart) {
        const cartItems = JSON.parse(cart);
        setLoadingProduct(true);
        const taxRate = await fetch("http://localhost:5100/api/order/tax-rate")
          .then((res) => res.json())
          .then((data) => data.taxRate);
        const res = await fetch(
          `http://localhost:5100/api/products/${cartItems[0].id}`
        ).then((res) => res.json());

        // Actual value, with or without promo code
        const actualPrice = res.discount_price || res.price;
        const subTotal = actualPrice;
        const tax = subTotal * taxRate * (1 - discountPercentage / 100);
        const discountAmountFromCode = subTotal * (discountPercentage / 100);

        const total = subTotal + tax + shipping - discountAmountFromCode;
        setTax(tax);
        // For display purpose only
        setDiscountAmount(discountAmountFromCode);
        setProductDetails(res);
        setSubtotal(subTotal);
        setTotal(total);
      } else {
        setProductDetails(null);
        setSubtotal(0);
        setTotal(0);
        setTax(0);
        setShipping(0);
      }
      setLoadingProduct(false);
    };
    if (isOpen) fetchCart();
  }, [isOpen, shipping, tax]);

  // Handle promo code change to update total and related
  // Will return a X percentage. This apply to subtotal
  // Also change tax, tax is based on sub total.
  useEffect(() => {
    const fetchPromoValue = async () => {
      if (!promoCode) {
        setPromoCodeError("");
        setPromoCodeNotif("");
        setDiscountPercentage(0);
        setDiscountAmount(0);
        setTax(subtotal * 0.1);
        setTotal(subtotal + tax + shipping);
        return;
      }
      const res = await getPromoCodeValue(promoCode);
      const canUse = await canUsePromoCode(promoCode);
      if (res === 0 || !canUse) {
        setPromoCodeError("Invalid promo code.");
        setPromoCodeNotif("");
        setDiscountPercentage(0);
        setDiscountAmount(0);
        setTax(subtotal * 0.1);
        setTotal(subtotal + tax + shipping);
      } else {
        setPromoCodeError("");
        setPromoCodeNotif("Promo code applied: " + res + "% discount.");
        setDiscountPercentage(res);
        const discount = subtotal * (res / 100);
        const newTax = (subtotal - discount) * 0.1;
        const newTotal = subtotal - discount + newTax + shipping;
        setDiscountPercentage(res);
        setDiscountAmount(discount);
        setTax(newTax);
        setTotal(newTotal);
      }
    };
    fetchPromoValue();
  }, [promoCode]);

  const handleCheckout = async () => {
    if (!isStepValid()) {
      console.log("Invalid step");
      return;
    }
    if (productDetails === null) {
      console.log("Product details not found");
      return;
    }
    // Order param beware!!
    const res = await placeOrder({
      shippingAddress: shippingAddress,
      customerDetails: customerDetails,
      paymentDetails: paymentDetails,
      paymentMethod: paymentMethod,
      productDetails: productDetails,
      shippingMethod: shippingMethod,
      PromoCodeApplied: promoCode,
    });

    if (res.error) {
      setValidationError(res.error);
      return;
    }

    setStep(5);
    setShowConfetti(true);
    setTimeout(() => {
      setShowConfetti(false);
    }, 2000);
    // onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      ariaHideApp={false}
      className="fixed right-0 top-0 w-2/5 h-full bg-gray-50 shadow-lg overflow-auto rounded-md"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-50"
    >
      {showConfetti && <Confetti />}

      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: isOpen ? 0 : "100%" }}
        transition={{ type: "tween", damping: 20, stiffness: 300 }}
        className="w-full h-full bg-white overflow-auto"
      >
        <div className="px-8 py-4 flex justify-between items-center border-b border-gray-200">
          <h2 className="text-2xl font-bold">Checkout</h2>
          <button onClick={onClose} className="text-gray-500 text-2xl">
            ✕
          </button>
        </div>

        <div className="p-8 flex">
          <div className="w-3/5">
            {validationError && (
              <p className="text-red-500 text-sm mb-4">{validationError}</p>
            )}
            {step === 1 && (
              <CartView
                productDetails={productDetails}
                quantity={quantity}
                setQuantity={setQuantity}
                onNext={nextStep}
                loadingProduct={loadingProduct}
              />
            )}
            {step === 2 && (
              <CustomerForm
                customerDetails={customerDetails}
                setCustomerDetails={setCustomerDetails}
                onNext={nextStep}
                onBack={prevStep}
              />
            )}
            {step === 3 && (
              <ShippingForm
                shippingAddress={shippingAddress}
                setShippingAddress={setShippingAddress}
                onNext={nextStep}
                onBack={prevStep}
                shippingMethod={shippingMethod}
                setShippingMethod={setShippingMethod}
                setShippingFee={setShipping}
              />
            )}
            {step === 4 && (
              <PaymentForm
                paymentDetails={paymentDetails}
                setPaymentDetails={setPaymentDetails}
                onSubmit={handleCheckout}
                onBack={prevStep}
                paymentMethod={paymentMethod}
                setPaymentMethod={setPaymentMethod}
              />
            )}
            {step === 5 && <SuccessOrderView />}
          </div>

          <div className="w-2/5 ml-8 p-4 bg-gray-100 rounded shadow-lg">
            <div className="flex justify-between mb-2">
              <span>Subtotal:</span>
              <span>{subtotal.toLocaleString()}₫</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Shipping:</span>
              <span>{shipping.toLocaleString()}₫</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Tax:</span>
              <span>{tax.toLocaleString()}₫</span>
            </div>

            {discountAmount > 0 && (
              <div className="flex justify-between items-center mb-2 text-green-600">
                <span>Discount ({discountPercentage}%):</span>
                <span>- {discountAmount.toLocaleString()}₫</span>
              </div>
            )}

            <div className="flex justify-between mb-4 text-xl font-bold">
              <span>Total:</span>
              <span>{total.toLocaleString()}₫</span>
            </div>
            {step === 1 && (
              <>
                <div className="mb-4">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Enter Promo Code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="w-full p-3 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                    />
                    {promoCodeError && (
                      <p className="mt-2 bg-red-100 text-red-600 text-sm p-2 rounded-md">
                        {promoCodeError}
                      </p>
                    )}
                    {promoCodeNotif && (
                      <p className="mt-2 bg-green-100 text-green-600 text-sm p-2 rounded-md">
                        {promoCodeNotif}
                      </p>
                    )}
                  </div>
                </div>
                {productDetails && (
                  <button
                    onClick={nextStep}
                    className="text-white px-4 py-3 w-full rounded bg-black-500 hover:bg-black-600 transition-all duration-300"
                  >
                    Proceed to Checkout
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </motion.div>
    </Modal>
  );
}
