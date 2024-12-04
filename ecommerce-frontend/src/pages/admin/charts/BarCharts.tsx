import AdminSidebar from "@/components/Shared/admin/AdminSidebar";
import { BarChart } from "@/components/Shared/admin/Charts";
import { LineSkeleton } from "@/components/Shared/Loader";
import { useBarQuery } from "@/redux/api/dashboardApi";
import { RootState } from "@/redux/store";
import { CustomError } from "@/types/api-types";
import { getLastMonths } from "@/utils/Features";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const { last12Months, last6Months } = getLastMonths();

const BarCharts = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);
  const userId = user?._id;
  const { isLoading, data, error, isError } = useBarQuery(userId!);

  const products = data?.charts.products || [];
  const orders = data?.charts.orders || [];
  const users = data?.charts.users || [];

  if (isError) {
    const err = error as CustomError;
    toast.error(err.data.message);
  }
  return (
    <div className="admin-container min-h-screen  bg-gray-50/50">
      <div className="grid xl:grid-cols-6">
        <div>
          <AdminSidebar />
        </div>

        <main className="chart-container col-span-4 md:col-span-5 overflow-y-auto bg-clip-border rounded-xl bg-white shadow-md p-10 md:p-16 m-4">
          <h1 className="text-md md:text-3xl font-bold">Bar Charts</h1>
          {isLoading ? (
            <LineSkeleton />
          ) : (
            <>
              <section className="p-5 md:p-20 flex flex-col gap-5">
                <BarChart
                  data_1={products}
                  data_2={users}
                  labels={last6Months}
                  title_1="Products"
                  title_2="Users"
                  bgColor_1={`hsl(260,50%,30%)`}
                  bgColor_2={`hsl(360,90%,90%)`}
                />
                <h2 className="text-md md:text-2xl uppercase text-center text-gray-700">
                  Top Selling Products & Top Customers
                </h2>
              </section>
              <section className="p-5 md:p-20 flex flex-col gap-5">
                <BarChart
                  horizontal={true}
                  data_1={orders}
                  data_2={[]}
                  title_1="Orders"
                  title_2=""
                  bgColor_1={`hsl(180, 40%, 50%)`}
                  bgColor_2=""
                  labels={last12Months}
                />
                <h2 className="text-md md:text-2xl uppercase text-center text-gray-700">
                  Orders throughout the year
                </h2>
              </section>
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default BarCharts;
