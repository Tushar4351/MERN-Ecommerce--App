import AdminSidebar from "../../components/Shared/admin/AdminSidebar";
import TableHOC from "../../components/Shared/admin/TableHOC";
import { FaTrash } from "react-icons/fa";
import { Column } from "react-table";
import { useState, useCallback } from "react";
import { ReactElement } from "react";

interface DataType {
  avatar: ReactElement;
  name: string;
  email: string;
  gender: string;
  role: string;
  action: ReactElement;
}

const columns: Column<DataType>[] = [
  {
    Header: "Avatar",
    accessor: "avatar",
  },
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Gender",
    accessor: "gender",
  },
  {
    Header: "Email",
    accessor: "email",
  },
  {
    Header: "Role",
    accessor: "role",
  },
  {
    Header: "Action",
    accessor: "action",
  },
];
const img = "https://randomuser.me/api/portraits/women/54.jpg";
const img2 = "https://randomuser.me/api/portraits/women/50.jpg";

const arr: DataType[] = [
  {
    avatar: (
      <img
        style={{
          borderRadius: "50%",
        }}
        src={img}
        alt="Shoes"
      />
    ),
    name: "Emily Palmer",
    email: "emily.palmer@example.com",
    gender: "female",
    role: "user",
    action: (
      <button>
        <FaTrash className="text-red-600" />
      </button>
    ),
  },

  {
    avatar: (
      <img
        style={{
          borderRadius: "50%",
        }}
        src={img2}
        alt="Shoes"
      />
    ),
    name: "May Scoot",
    email: "aunt.may@example.com",
    gender: "female",
    role: "user",
    action: (
      <button>
        <FaTrash className="text-red-600"/>
      </button>
    ),
  },
];

const Customers = () => {
  const [data] = useState<DataType[]>(arr);

  const Table = useCallback(
    TableHOC<DataType>(
      columns,
      data,
      "dashboard-product-box",
      "Customers",
      true
    ),
    []
  );
  return (
    <div className="h-screen xl:grid xl:grid-cols-6 bg-gray-50/50">
    <div>
      <AdminSidebar />
    </div>
  
    <div className="md:col-span-5 flex flex-row overflow-y-auto m-4 p-4 bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
      <div className="w-full">{Table()}</div>
    </div>
  </div>
  );
};

export default Customers;
