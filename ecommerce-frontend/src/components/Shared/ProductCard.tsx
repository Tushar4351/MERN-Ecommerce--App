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

const server = "safafwsgesrg";
const ProductCard = ({
  productId,
  price,
  name,
  photo,
  stock,
  handler,
}: ProductsProps) => {
  return (
    <div className="relative max-w-sm min-w-[340px] bg-white shadow-md rounded-3xl p-2 mx-1 my-3 cursor-pointer">
      <div className="overflow-x-hidden rounded-2xl relative">
        <img
          className="h-40 rounded-2xl w-full object-cover"
          //{`${server}/${photo}`}
          src={photo}
          alt={name}
          //   src="https://pixahive.com/wp-content/uploads/2020/10/Gym-shoes-153180-pixahive.jpg"
          //   alt="Product"
        />
        <button
          onClick={() => handler()}
          className="absolute right-2 top-2 bg-white rounded-full p-2 cursor-pointer group"
        >
          <BsCart3 className="h-6 w-6 group-hover:opacity-50 opacity-70" />
        </button>
      </div>
      <div className="mt-4 pl-2 mb-2 flex justify-between">
        <div>
          <p className="text-lg font-semibold text-gray-900 mb-0">{name}</p>
          <p className="text-md text-green-150 mt-0 font-semibold">₹{price}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
