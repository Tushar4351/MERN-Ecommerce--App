import Breadcrumb from "@/components/Shared/Breadcrumb";
import { motion } from "framer-motion";
import { CreditCard, Check } from "lucide-react";
import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { resetCart } from "../redux/reducer/cartReducer";
import { NewOrderRequest } from "../types/api-types";
import { useNewOrderMutation } from "@/redux/api/orderApi";
import { responseToast } from "@/utils/Features";
import { RootState } from "@/redux/store";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);

const CheckOutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state: RootState) => state.userReducer);

  const {
    shippingInfo,
    cartItems,
    subtotal,
    tax,
    discount,
    shippingCharges,
    total,
  } = useSelector((state: RootState) => state.cartReducer);

  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const [newOrder] = useNewOrderMutation();

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) return;
    setIsProcessing(true);

    const userId = user?._id;

    const orderData: NewOrderRequest = {
      shippingInfo,
      orderItems: cartItems,
      subtotal,
      tax,
      discount,
      shippingCharges,
      total,
      user: userId!,
    };

    const { paymentIntent, error } = await stripe.confirmPayment({
      elements,
      confirmParams: { return_url: window.location.origin },
      redirect: "if_required",
    });

    if (error) {
      setIsProcessing(false);
      return toast.error(error.message || "Something Went Wrong");
    }

    if (paymentIntent.status === "succeeded") {
      const res = await newOrder(orderData);
      dispatch(resetCart());
      responseToast(res, navigate, "/orders");
    }
    setIsProcessing(false);
  };
  return (
    <div className="checkout-container">
      <form onSubmit={submitHandler}>
        <div className="space-y-4">
          <div className="text-xl font-semibold text-gray-900">Card Detail</div>
          <PaymentElement />
        </div>
        <motion.button
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="w-full p-4 mt-4 bg-emerald-500 text-white rounded-lg font-medium hover:bg-emerald-500/90 transition-colors"
          type="submit"
          disabled={isProcessing}
        >
          {isProcessing ? "Processing..." : "Pay"}
        </motion.button>
      </form>
    </div>
  );
};

const Payment = () => {
  const [cardType, setCardType] = useState("credit");
  const location = useLocation();
  const { user } = useSelector((state: RootState) => state.userReducer);

  const { shippingInfo, subtotal, tax, total, shippingCharges, discount } =
    useSelector((state: RootState) => state.cartReducer);

  const clientSecret: string | undefined = location.state;

  if (!clientSecret) return <Navigate to={"/shipping"} />;
  return (
    <Elements
      options={{
        clientSecret,
      }}
      stripe={stripePromise}
    >
      <div className="mt-12">
        <Breadcrumb pageName="shipping" currentPage="Payment" />
      </div>

      <div className="flex flex-col md:flex-row max-w-7xl mx-auto w-full justify-center items-center md:items-baseline border-t-2">
        <div className="p-6 space-y-6 md:border-r-2 sm:w-2/3">
          <div className="text-xl font-semibold text-gray-900">Card Type</div>

          <div className="grid grid-cols-2 gap-4">
            <motion.button
              whileTap={{ scale: 0.95 }}
              className={`p-4 border rounded-lg flex items-center gap-2 ${
                cardType === "credit"
                  ? "border-emerald-500 bg-emerald-50"
                  : "border-gray-200"
              }`}
              onClick={() => setCardType("credit")}
            >
              <CreditCard className="w-5 h-5" />
              <span>Credit Card</span>
              {cardType === "credit" && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="ml-auto text-emerald-500"
                >
                  <Check className="w-5 h-5" />
                </motion.div>
              )}
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.95 }}
              className={`p-4 border rounded-lg flex items-center gap-2 ${
                cardType === "debit"
                  ? "border-emerald-500 bg-emerald-50"
                  : "border-gray-200"
              }`}
              onClick={() => setCardType("debit")}
            >
              <CreditCard className="w-5 h-5" />
              <span>Debit Card</span>
              {cardType === "debit" && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="ml-auto text-emerald-500"
                >
                  <Check className="w-5 h-5" />
                </motion.div>
              )}
            </motion.button>
          </div>
          <CheckOutForm />
        </div>

        <div className="rounded-lg flex flex-col md:w-1/3 border-2 sm:w-1/2 md:border-0">
          <div className="flex flex-col border-b-2 h-1/3 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              Shipping To
            </h2>
            <h3 className="font-sora-medium text-md">{user?.name}</h3>
            <p className="text-gray-500 text-sm">
              {shippingInfo.address},{shippingInfo.pinCode}
            </p>
          </div>
          <div className="h-1/2 p-6">
            <p className="text-xl font-semibold text-gray-900 mb-3">
              Order summary
            </p>

            <div className="space-y-6">
              <div className="space-y-4">
                <dl className="flex items-center justify-between gap-4">
                  <dt className="text-base font-normal text-gray-500">
                    Original price
                  </dt>
                  <dd className="text-base font-medium text-gray-900 ">
                    ₹{subtotal}
                  </dd>
                </dl>

                <dl className="flex items-center justify-between gap-4">
                  <dt className="text-base font-normal text-gray-500 ">Tax:</dt>
                  <dd className="text-base font-medium">₹{tax}</dd>
                </dl>

                <dl className="flex items-center justify-between gap-4">
                  <dt className="text-base font-normal text-gray-500 ">
                    Discount:
                  </dt>
                  <dd className="text-base font-medium text-green-600 ">
                    - ₹{discount}
                  </dd>
                </dl>

                <dl className="flex items-center justify-between gap-4">
                  <dt className="text-base font-normal text-gray-500">
                    Shipping Charges:
                  </dt>
                  <dd className="text-base font-medium text-gray-900 ">
                    ₹{shippingCharges}
                  </dd>
                </dl>
              </div>

              <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-4 dark:border-gray-700">
                <dt className="text-base font-bold text-gray-900 ">Total:</dt>
                <dd className="text-base font-bold text-gray-900 ">₹{total}</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </Elements>
  );
};

export default Payment;
