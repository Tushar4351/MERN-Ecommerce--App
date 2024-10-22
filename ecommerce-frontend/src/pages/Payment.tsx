import Breadcrumb from "@/components/Shared/Breadcrumb";
import { useState } from "react";
import { motion } from "framer-motion";
import { CreditCard, Calendar, Lock, Check } from "lucide-react";
import { RiVisaLine } from "react-icons/ri";
const Payment = () => {
  const [cardType, setCardType] = useState("credit");
  const [saveCard, setSaveCard] = useState(false);
  return (
    <div>
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

          <div className="space-y-4">
            <div className="text-xl font-semibold text-gray-900">Card Detail</div>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Name On Card"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
              />

              <div className="relative">
                <input
                  type="text"
                  placeholder="Card Number"
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
                />
                <RiVisaLine className="absolute w-9 h-9 text-blue-900 right-3 top-1/2 transform -translate-y-1/2"/>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="MM / YY"
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
                  />
                  <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                </div>

                <div className="relative">
                  <input
                    type="password"
                    placeholder="CVV"
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
                  />
                  <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                </div>
              </div>
            </div>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={saveCard}
                onChange={(e) => setSaveCard(e.target.checked)}
                className="w-5 h-5 text-emerald-500 rounded focus:ring-emerald-500"
              />
              <span className="text-sm text-gray-600">
                Securely save this card for a faster checkout next time
              </span>
            </label>

            <motion.button
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="w-full p-4 bg-emerald-500 text-white rounded-lg font-medium hover:bg-emerald-600 transition-colors"
            >
              Pay $195.30
            </motion.button>
          </div>
        </div>

        <div className="rounded-lg flex flex-col md:w-1/3 border-2 sm:w-1/2 md:border-0">
          <div className="flex flex-col border-b-2 h-1/3 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              Shipping To
            </h2>
            <h3 className="font-sora-medium text-md">Tushar Bhowal</h3>
            <p className="text-gray-500 text-sm">
              79,ichapur goalapara gurudua,743144
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
                    ₹3000
                  </dd>
                </dl>

                <dl className="flex items-center justify-between gap-4">
                  <dt className="text-base font-normal text-gray-500 ">Tax:</dt>
                  <dd className="text-base font-medium">₹540</dd>
                </dl>

                <dl className="flex items-center justify-between gap-4">
                  <dt className="text-base font-normal text-gray-500 ">
                    Discount:
                  </dt>
                  <dd className="text-base font-medium text-green-600 ">
                    - ₹400
                  </dd>
                </dl>

                <dl className="flex items-center justify-between gap-4">
                  <dt className="text-base font-normal text-gray-500">
                    Shipping Charges:
                  </dt>
                  <dd className="text-base font-medium text-gray-900 ">₹100</dd>
                </dl>
              </div>

              <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-4 dark:border-gray-700">
                <dt className="text-base font-bold text-gray-900 ">Total:</dt>
                <dd className="text-base font-bold text-gray-900 ">₹3640</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
