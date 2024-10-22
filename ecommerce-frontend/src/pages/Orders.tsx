import { ReactElement,  useState } from "react";

import { Link } from "react-router-dom";
import { Column } from "react-table";
import TableHOC from "../components/Shared/admin/TableHOC";
import Breadcrumb from "@/components/Shared/Breadcrumb";



type DataType = {
  _id: string;
  amount: number;
  quantity: number;
  discount: number;
  status: ReactElement;
  action: ReactElement;
};

const column: Column<DataType>[] = [
  {
    Header: "ID",
    accessor: "_id",
  },
  {
    Header: "Quantity",
    accessor: "quantity",
  },
  {
    Header: "Discount",
    accessor: "discount",
  },
  {
    Header: "Amount",
    accessor: "amount",
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

const Orders = () => {
 

    const [rows] = useState<DataType[]>([
        {
          _id: "1",
          amount: 100,
          quantity: 1,
          discount: 0,
          status: <span className="text-red-500">Processing</span>,
          action: <Link to={`/orders/sgdgdhgdehhedth`}>Manage</Link>,
        },
      ]);




  const Table = TableHOC<DataType>(
    column,
    rows,
    "dashboard-product-box",
    "Orders",
    rows.length > 6
  )();
  return (
    <div className="container max-w-7xl w-full overflow-auto">
      <div className="mt-12">
        <Breadcrumb pageName="Home" currentPage="My Orders" />
      </div>
      {Table}
    </div>
  );
};

export default Orders;