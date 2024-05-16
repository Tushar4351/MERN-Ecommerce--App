import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
type CartItemProps = {
  cartItem: any;
};
const CartItemCard = ({ cartItem }: CartItemProps) => {
  const { photo, productId, name, price, quantity } = cartItem;
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm md:p-6">
      <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
        <Link to={`/product/${productId}`}>
          <img className="h-20 w-20" src={photo} alt="Product image" />
        </Link>

        <label htmlFor="counter-input" className="sr-only">
          Choose quantity:
        </label>
        <div className="flex items-center justify-between md:order-3 md:justify-end">
          <div className="flex items-center">
            <button
              type="button"
              id="decrement-button"
              data-input-counter-decrement="counter-input"
             
            >
              -
            </button>
            <input
              type="text"
              id="counter-input"
              data-input-counter
              className="w-5 mx-2 shrink-0 border-0 bg-gray-100 rounded-sm text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0"
              placeholder=""
              value={quantity}
              required
            />
            <button
              type="button"
              id="increment-button"
              data-input-counter-increment="counter-input"
              
            >
              +
            </button>
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
              type="button"
              className="inline-flex items-center text-sm font-medium text-red-600 hover:underline"
            >
              Remove<FaTrash className="ml-1"/>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItemCard;
