import { BsSearch } from "react-icons/bs";
import AdminSidebar from "../../components/admin/AdminSidebar";
import { FaRegBell } from "react-icons/fa";
import userImg from "../../assets/userpic.png";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50/50 ">
      <div className="grid grid-cols-6">
        <AdminSidebar />
        <main className="col-span-4 md:col-span-5 overflow-y-auto">
          {/*Bar section  */}

          <div className="m-5">
            <div className="flex flex-row mt-5 gap-10">
              <div className="flex pl-2 shadow-md items-center w-full rounded-lg bg-white">
                <BsSearch />
                <input
                  type="text"
                  className="w-full border-none bg-transparent px-4 py-2 text-gray-400 outline-none focus:outline-none"
                  placeholder="Search for data, users, docs"
                />
              </div>
              <div className="flex gap-5">
                <FaRegBell className="h-10 w-10 cursor-pointer"/>
                <img className="h-10 w-10 cursor-pointer" src={userImg} alt="User" />
              </div>
            </div>
          </div>

          {/*Card section  */}
          <div></div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
