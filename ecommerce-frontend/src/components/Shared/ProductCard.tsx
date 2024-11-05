import React from "react";
import { BsCart3 } from "react-icons/bs";

type ProductsProps = {
  productId: string;
  photo: string;
  name: string;
  price: number;
  stock: number;
  handler: () => void;
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
    <div className="group relative">
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
        <img
          className="h-full w-full object-cover object-center lg:h-full lg:w-full transition duration-500 group-hover:scale-105"
          src={photo}
          alt={name}
        />
        <button
          onClick={() => handler()}
          className="absolute left-1/2 top-1/2 w-10 h-10 inset-0 flex items-center justify-center bg-black-heading rounded-full p-2 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform -translate-x-1/2 -translate-y-1/2"
        >
          <BsCart3 className="h-6 w-6 text-white" />
        </button>
      </div>
      <div className="mt-4 flex justify-between items-center">
        <div>
          <h3 className="text-sm text-gray-700">
            <a href="#">
              <span aria-hidden="true" className="absolute inset-0" />
              <p className="text-lg font-semibold text-gray-900">{name}</p>
            </a>
          </h3>
        </div>
        <p className="text-sm font-medium text-gray-900">₹{price}</p>
      </div>
    </div>
  );
};

export default ProductCard;
