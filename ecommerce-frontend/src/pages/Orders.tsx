import { ReactElement, useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { Column } from "react-table";
import TableHOC from "../components/Shared/admin/TableHOC";
import Breadcrumb from "@/components/Shared/Breadcrumb";
import { useSelector } from "react-redux";
import { UserReducerInitialState } from "@/types/reducer-types";
import { useMyOrdersQuery } from "@/redux/api/orderApi";
import { CustomError } from "@/types/api-types";
import toast from "react-hot-toast";
import { LineSkeleton } from "@/components/Shared/Loader";
import { RootState } from "@/redux/store";

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
  const { user } = useSelector((state: RootState) => state.userReducer);
  const userId = user?._id;
  const { isLoading, data, isError, error } = useMyOrdersQuery(userId!);

  const [rows, setRows] = useState<DataType[]>([]);

  if (isError) {
    const err = error as CustomError;
    toast.error(err.data.message);
  }

  useEffect(() => {
    if (data)
      setRows(
        data.orders.map((i) => ({
          _id: i._id,
          amount: i.total,
          discount: i.discount,
          quantity: i.orderItems.length,
          status: (
            <span
              className={
                i.status === "Processing"
                  ? "text-red-500"
                  : i.status === "Shipped"
                  ? "text-green-500"
                  : "text-purple-500"
              }
            >
              {i.status}
            </span>
          ),
          action: <Link to={`/admin/transaction/${i._id}`}>Manage</Link>,
        }))
      );
  }, [data]);

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
      </div>{" "}
      {isLoading ? (
        <>
          <LineSkeleton />
        </>
      ) : (
        Table
      )}
    </div>
  );
};

export default Orders;
