import AdminSidebar from "../../components/Shared/admin/AdminSidebar";
import { Column } from "react-table";
import { Link } from "react-router-dom";
import { ReactElement, useState, useCallback } from "react";
import TableHOC from "../../components/Shared/admin/TableHOC";

interface DataType {
  user: string;
  amount: number;
  discount: number;
  quantity: number;
  status: ReactElement;
  action: ReactElement;
}

const columns: Column<DataType>[] = [
  {
    Header: "Avatar",
    accessor: "user",
  },
  {
    Header: "Amount",
    accessor: "amount",
  },
  {
    Header: "Discount",
    accessor: "discount",
  },
  {
    Header: "Quantity",
    accessor: "quantity",
  },
  {
    Header: "Status",
    accessor: "status",
  },
  {
    Header: "Action",
    accessor: "action",
  },
];

const arr: DataType[] = [
  {
    user: "Charas",
    amount: 4500,
    discount: 400,
    quantity: 3,
    status: <span className="text-red-600">Processing</span>,
    action: (
      <Link
        className="bg-blue-300 p-2 text-center rounded-2xl text-blue-900"
        to="/admin/transaction/sajknaskd"
      >
        Manage
      </Link>
    ),
  },
  {
    user: "Xavirors",
    amount: 6999,
    discount: 400,
    status: <span className="text-green-500">Shipped</span>,
    quantity: 6,
    action: (
      <Link
        className="bg-blue-300 p-2 text-center rounded-2xl text-blue-900"
        to="/admin/transaction/sajknaskd"
      >
        Manage
      </Link>
    ),
  },
  {
    user: "Xavirors",
    amount: 6999,
    discount: 400,
    status: <span className="text-indigo-600">Delivered</span>,
    quantity: 6,
    action: (
      <Link
        className="bg-blue-300 p-2 text-center rounded-2xl text-blue-900"
        to="/admin/transaction/sajknaskd"
      >
        Manage
      </Link>
    ),
  },
];

const Transaction = () => {
  const [data] = useState<DataType[]>(arr);

  const Table = useCallback(
    TableHOC<DataType>(
      columns,
      data,
      "dashboard-product-box",
      "Transactions",
      true
    ),
    []
  );
  return (
    <div className="h-screen xl:grid xl:grid-cols-6 bg-gray-50/50">

    <div>
      <AdminSidebar />
    </div>
  
    <div className="md:col-span-5 xl:col-span-5 flex flex-row overflow-y-auto m-4 p-4 bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
      <div className="w-full">{Table()}</div>
    </div>
  </div>
  );
};

export default Transaction;
