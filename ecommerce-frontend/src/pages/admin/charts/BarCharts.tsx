import AdminSidebar from "@/components/Shared/admin/AdminSidebar";
import { BarChart } from "@/components/Shared/admin/Charts";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];

const BarCharts = () => {
  return (
    <div className="admin-container min-h-screen bg-gray-50/50">
      <div className="grid grid-cols-6">
        <div>
          <AdminSidebar />
        </div>

        <main className="chart-container col-span-4 md:col-span-5 overflow-y-auto bg-clip-border rounded-xl bg-white shadow-md p-16">
          <h1 className="text-3xl font-bold">Bar Charts</h1>
          <section className="p-20 flex flex-col gap-5">
            <BarChart
              data_1={[200, 444, 343, 556, 778, 455, 990]}
              data_2={[300, 144, 433, 655, 237, 755, 190]}
              title_1="Products"
              title_2="Users"
              bgColor_1={`hsl(260,50%,30%)`}
              bgColor_2={`hsl(360,90%,90%)`}
            />
            <h2 className="text-2xl uppercase text-center text-gray-700">Top Selling Products & Top Customers</h2>
          </section>
          <section className="p-20 flex flex-col gap-5">
            <BarChart
              horizontal={true}
              data_1={[
                200, 444, 343, 556, 778, 455, 990, 444, 122, 334, 890, 909,
              ]}
              data_2={[]}
              title_1="Products"
              title_2=""
              bgColor_1={`hsl(180, 40%, 50%)`}
              bgColor_2=""
              labels={months}
            />
            <h2 className="text-2xl uppercase text-center text-gray-700">Orders throughout the year</h2>
          </section>
        </main>
      </div>
    </div>
  );
};

export default BarCharts;
