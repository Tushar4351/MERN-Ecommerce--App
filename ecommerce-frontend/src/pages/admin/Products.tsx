import AdminSidebar from "../../components/Shared/admin/AdminSidebar";

import { ReactElement, useCallback, useState } from "react";

import TableHOC from "../../components/Shared/admin/TableHOC";
import { Column } from "react-table";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";

interface DataType {
  photo: ReactElement;
  name: string;
  price: number;
  stock: number;
  action: ReactElement;
}

const columns: Column<DataType>[] = [
  {
    Header: "Photo",
    accessor: "photo",
  },
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Price",
    accessor: "price",
  },
  {
    Header: "Stock",
    accessor: "stock",
  },
  {
    Header: "Action",
    accessor: "action",
  },
];

const img =
  "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXN8ZW58MHx8MHx8&w=1000&q=804";

const img2 = "https://m.media-amazon.com/images/I/514T0SvwkHL._SL1500_.jpg";

const arr: DataType[] = [
  {
    photo: (
      <img
        className="w-16 h-16 object-contain rounded-lg"
        src={img}
        alt="Shoes"
      />
    ),
    name: "Puma Shoes Air Jordan Cook Nigga 2023",
    price: 690,
    stock: 3,
    action: (
      <Link
        className="bg-blue-300 p-2 text-center rounded-2xl text-blue-900"
        to="/admin/product/sajknaskd"
      >
        Manage
      </Link>
    ),
  },

  {
    photo: (
      <img
        className="w-16 h-16 object-contain rounded-lg"
        src={img2}
        alt="Shoes"
      />
    ),
    name: "Macbook",
    price: 232223,
    stock: 213,
    action: (
      <Link
        className="bg-blue-300 p-2 text-center rounded-2xl text-blue-900"
        to="/admin/product/sdaskdnkasjdn"
      >
        Manage
      </Link>
    ),
  },
  {
    photo: (
      <img
        className="w-16 h-16 object-contain rounded-lg"
        src={img}
        alt="Shoes"
      />
    ),
    name: "Puma Shoes Air Jordan Cook Nigga 2023",
    price: 690,
    stock: 3,
    action: (
      <Link
        className="bg-blue-300 p-2 text-center rounded-2xl text-blue-900"
        to="/admin/product/sajknaskd"
      >
        Manage
      </Link>
    ),
  },

  {
    photo: (
      <img
        className="w-16 h-16 object-contain rounded-lg"
        src={img2}
        alt="Shoes"
      />
    ),
    name: "Macbook",
    price: 232223,
    stock: 213,
    action: (
      <Link
        className="bg-blue-300 p-2 text-center rounded-2xl text-blue-900"
        to="/admin/product/sdaskdnkasjdn"
      >
        Manage
      </Link>
    ),
  },
  {
    photo: (
      <img
        className="w-16 h-16 object-contain rounded-lg"
        src={img}
        alt="Shoes"
      />
    ),
    name: "Puma Shoes Air Jordan Cook Nigga 2023",
    price: 690,
    stock: 3,
    action: (
      <Link
        className="bg-blue-300 p-2 text-center rounded-2xl text-blue-900"
        to="/admin/product/sajknaskd"
      >
        Manage
      </Link>
    ),
  },

  {
    photo: (
      <img
        className="w-16 h-16 object-contain rounded-lg"
        src={img2}
        alt="Shoes"
      />
    ),
    name: "Macbook",
    price: 232223,
    stock: 213,
    action: (
      <Link
        className="bg-blue-300 p-2 text-center rounded-2xl text-blue-900"
        to="/admin/product/sdaskdnkasjdn"
      >
        Manage
      </Link>
    ),
  },
  {
    photo: (
      <img
        className="w-16 h-16 object-contain rounded-lg"
        src={img2}
        alt="Shoes"
      />
    ),
    name: "Macbook",
    price: 232223,
    stock: 213,
    action: (
      <Link
        className="bg-blue-300 p-2 text-center rounded-2xl text-blue-900"
        to="/admin/product/sdaskdnkasjdn"
      >
        Manage
      </Link>
    ),
  },
];

const Products = () => {
  const [data] = useState<DataType[]>(arr);

  const Table = useCallback(
    TableHOC<DataType>(
      columns,
      data,
      "dashboard-product-box",
      "Products",
      true
    ),
    []
  );

  return (
    <div className="h-screen grid grid-cols-6 bg-gray-50/50">
      <div>
        {" "}
        <AdminSidebar />{" "}
      </div>

      <div className="md:col-span-5 flex flex-row overflow-y-auto ml-4 p-4 bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
        <div className="w-full">{Table()}</div>
        <Link to="/admin/product/new" className="create-product-btn">
          <FaPlus className="bg-red-700 text-white w-8 h-8 rounded-full p-1.5 hover:opacity-65" />
        </Link>
      </div>
    </div>
  );
};

export default Products;
