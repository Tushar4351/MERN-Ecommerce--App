import { server } from "@/redux/store";
import { CartItem } from "@/types/types";
import React from "react";
import { BsCart3 } from "react-icons/bs";
import { motion } from "framer-motion";
type ProductsProps = {
  productId: string;
  photo: {
    url: string;
    public_id: string;
  }[];
  name: string;
  price: number;
  stock: number;
  handler: (cartItem: CartItem) => string | undefined;
};

const ProductCard = ({
  productId,
  price,
  name,
  photo,
  stock,
  handler,
}: ProductsProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className="group relative w-[250px]"
    >
      <div className="relative aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none lg:h-80">
        <img
          className="h-full w-full object-cover object-center lg:h-full lg:w-full transition duration-500 group-hover:scale-105"
          src={`${server}/${photo}`}
          alt={name}
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/20 transition-colors duration-300">
          <button
            onClick={() =>
              handler({
                productId,
                price,
                name,
                photo,
                stock,
                quantity: 1,
              })
            }
            className="transform -translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 z-10"
          >
            <BsCart3 className="h-6 w-6 text-gray-900" />
          </button>
        </div>
      </div>
      <div className="mt-4 flex justify-between items-center">
        <div>
          <h3 className="text-sm text-gray-700">
            <a href={`/product/${productId}`}>
              <span aria-hidden="true" className="absolute inset-0" />
              <p className="text-lg font-semibold text-gray-900">{name}</p>
            </a>
          </h3>
        </div>
        <p className="text-sm font-medium text-gray-900">₹{price}</p>
      </div>
    </motion.div>
  );
};

export default ProductCard;
