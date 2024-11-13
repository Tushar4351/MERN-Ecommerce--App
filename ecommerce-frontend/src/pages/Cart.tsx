import Breadcrumb from "@/components/Shared/Breadcrumb";
import CartItemCard from "@/components/Shared/CartItemCard";
import { Button } from "@/components/ui/button";
import {
  addToCart,
  calculatePrice,
  discountApplied,
  removeCartItem,
  saveCoupon,
} from "@/redux/reducer/cartReducer";
import { server } from "@/redux/store";
import { CartReducerInitialState } from "@/types/reducer-types";
import { CartItem } from "@/types/types";
import axios from "axios";
import { useEffect, useState } from "react";
import { VscError } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cartItems, subtotal, tax, total, shippingCharges, discount } =
    useSelector(
      (state: { cartReducer: CartReducerInitialState }) => state.cartReducer
    );

  const dispatch = useDispatch();

  const [couponCode, setCouponCode] = useState<string>("");
  const [isValidCouponCode, setIsValidCouponCode] = useState<boolean>(false);

  const incrementHandler = (cartItem: CartItem) => {
    if (cartItem.quantity >= cartItem.stock) return;

    dispatch(addToCart({ ...cartItem, quantity: cartItem.quantity + 1 }));
  };

  const decrementHandler = (cartItem: CartItem) => {
    if (cartItem.quantity <= 1) return;

    dispatch(addToCart({ ...cartItem, quantity: cartItem.quantity - 1 }));
  };

  const removeHandler = (productId: string) => {
    dispatch(removeCartItem(productId));
  };

  useEffect(() => {
    const { token: cancelToken, cancel } = axios.CancelToken.source();

    const timeOutId = setTimeout(() => {
      axios
        .get(`${server}/api/v1/payment/discount?coupon=${couponCode}`, {
          cancelToken,
        })
        .then((res) => {
          dispatch(discountApplied(res.data.discount));
          dispatch(saveCoupon(couponCode));
          setIsValidCouponCode(true);
          dispatch(calculatePrice());
        })
        .catch(() => {
          dispatch(discountApplied(0));
          setIsValidCouponCode(false);
          dispatch(calculatePrice());
        });
    }, 1000);

    return () => {
      clearTimeout(timeOutId);
      cancel();
      setIsValidCouponCode(false);
    };
  }, [couponCode]);

  useEffect(() => {
    dispatch(calculatePrice());
  }, [cartItems]);

  return (
    <section className="bg-white  antialiased py-16">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <Breadcrumb pageName="Home" currentPage="Shopping Cart" />

        <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
          <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
            <div className="space-y-6">
              {cartItems.length > 0 ? (
                cartItems.map((i, idx) => (
                  <CartItemCard
                    incrementHandler={incrementHandler}
                    decrementHandler={decrementHandler}
                    removeHandler={removeHandler}
                    key={idx}
                    cartItem={i}
                  />
                ))
              ) : (
                <h1 className="text-center text-gray-900">No Items Added</h1>
              )}
            </div>
          </div>

          <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
            <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
              <p className="text-xl font-semibold text-gray-900">
                Order summary
              </p>

              <div className="space-y-4">
                <div className="space-y-2">
                  <dl className="flex items-center justify-between gap-4">
                    <dt className="text-base font-normal text-gray-500">
                      Original price
                    </dt>
                    <dd className="text-base font-medium text-gray-900 ">
                      ₹{subtotal}
                    </dd>
                  </dl>

                  <dl className="flex items-center justify-between gap-4">
                    <dt className="text-base font-normal text-gray-500 ">
                      Tax:
                    </dt>
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

                <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                  <dt className="text-base font-bold text-gray-900 ">Total:</dt>
                  <dd className="text-base font-bold text-gray-900 ">
                    ₹{total}
                  </dd>
                </dl>
              </div>

              <div className="flex items-center justify-center gap-2">
                <span className="text-sm font-normal text-gray-500"> or </span>
                <Link
                  to="/products"
                  title=""
                  className="inline-flex items-center gap-2 text-sm font-medium text-primary-700 underline hover:no-underline"
                >
                  Continue Shopping
                </Link>
              </div>
              <Button className="w-full bg-green-150 hover:bg-green-150/80">
                <Link to="/shipping" className="text-white">
                  Proceed to Checkout
                </Link>
              </Button>
            </div>

            <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm  sm:p-6">
              <div className="mb-2 text-sm font-medium text-gray-900 ">
                Do you have a coupon or gift card?
              </div>
              <div className="flex space-x-4">
                <div>
                  <input
                    type="text"
                    placeholder="Coupon Code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500"
                  />
                  {couponCode &&
                    (isValidCouponCode ? (
                      <span className="text-green-600 text-sm">
                        ₹{discount} off using the <code>{couponCode}</code>
                      </span>
                    ) : (
                      <span className="text-red-600">
                        Invalid Coupon <VscError />
                      </span>
                    ))}
                </div>

                <Button className="bg-green-150 hover:bg-green-150/80">
                  Apply Code
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;
