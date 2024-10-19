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
   
      <div className="group relative">
        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
          <img
            className="h-full w-full object-cover object-center lg:h-full lg:w-full"
            //{`${server}/${photo}`}
            src={photo}
            alt={name}
          />
          <button
            onClick={() => handler()}
            className="absolute right-2 top-2 bg-white rounded-full p-2 cursor-pointer group"
          >
            <BsCart3 className="h-6 w-6 group-hover:opacity-50 opacity-70" />
          </button>
        </div>
        <div className="mt-4 flex justify-between">
          <div>
            <h3 className="text-sm text-gray-700">
              <a href="#">
                <span aria-hidden="true" className="absolute inset-0" />
                <p className="text-lg font-semibold text-gray-900 mb-0">
                  {name}
                </p>
              </a>
            </h3>
          </div>
          <p className="text-sm font-medium text-gray-900">₹{price}</p>
        </div>
      </div>
   
  );
};

export default ProductCard;
