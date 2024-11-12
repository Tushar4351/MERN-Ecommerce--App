import { server } from "@/redux/store";
import { CartItem } from "@/types/types";
import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

type CartItemProps = {
  cartItem: CartItem;
  incrementHandler: (cartItem: CartItem) => void;
  decrementHandler: (cartItem: CartItem) => void;
  removeHandler: (id: string) => void;
};

const CartItemCard = ({
  cartItem,
  incrementHandler,
  decrementHandler,
  removeHandler,
}: CartItemProps) => {
  const { photo, productId, name, price, quantity } = cartItem;
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm md:p-6">
      <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
        <Link to={`/product/${productId}`}>
          <img
            className="h-20 w-20"
            src={`${server}/${photo}`}
            alt="Product image"
          />
        </Link>

        <label htmlFor="counter-input" className="sr-only">
          Choose quantity:
        </label>
        <div className="flex items-center justify-between md:order-3 md:justify-end">
          <div className="flex items-center">
            <button onClick={() => decrementHandler(cartItem)}>-</button>
            <p className="w-5 mx-2 shrink-0 border-0 bg-gray-100 rounded-sm text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0">
              {quantity}
            </p>
            <button onClick={() => incrementHandler(cartItem)}>+</button>
          </div>
          <div className="text-end md:order-4 md:w-32">
            <p className="text-base font-bold text-gray-900">₹{price}</p>
          </div>
        </div>

        <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
          <Link
            to={`/product/${productId}`}
            className="text-base font-medium text-gray-900 hover:underline"
          >
            {name}
          </Link>
          <div className="">
            <button
              onClick={() => removeHandler(productId)}
              className="inline-flex items-center text-sm font-medium text-red-600 hover:underline"
            >
              Remove
              <FaTrash className="ml-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItemCard;
