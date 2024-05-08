import AdminSidebar from "@/components/Shared/admin/AdminSidebar";
import { LineChart } from "@/components/Shared/admin/Charts";

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
    <div className="admin-container xl:grid xl:grid-cols-6 min-h-screen bg-gray-50/50">
         <div>
        <AdminSidebar />
      </div>

      <main className="chart-container m-4 md:col-span-5 g-clip-border rounded-xl bg-white shadow-md p-5 overflow-y-auto">
        <h1 className="text-md md:text-3xl font-bold mt-10 ml-8">Line Charts</h1>
        <section className="w-4/5 mx-auto my-16 flex flex-col gap-10">
          <LineChart
            data={[
              200, 444, 444, 556, 778, 455, 990, 1444, 256, 447, 1000, 1200,
            ]}
            label="Users"
            borderColor="rgb(53, 162, 255)"
            backgroundColor="rgba(53, 162, 255,0.5)"
            labels={months}
          />
          <h2 className="text-md md:text-2xl uppercase text-center text-gray-700">Active Users</h2>
        </section>
        <section className="w-4/5 mx-auto my-16 flex flex-col gap-10">
          <LineChart
            data={[40, 60, 244, 100, 143, 120, 41, 47, 50, 56, 32]}
            backgroundColor={"hsla(269,80%,40%,0.4)"}
            borderColor={"hsl(269,80%,40%)"}
            label="Products"
            labels={months}
          />
          <h2 className="text-md md:text-2xl uppercase text-center text-gray-700">Total Products (SKU)</h2>
        </section>

        <section className="w-4/5 mx-auto my-16 flex flex-col gap-10">
          <LineChart
            data={[
              24000, 14400, 24100, 34300, 90000, 20000, 25600, 44700, 99000,
              144400, 100000, 120000,
            ]}
            backgroundColor={"hsla(129,80%,40%,0.4)"}
            borderColor={"hsl(129,80%,40%)"}
            label="Revenue"
            labels={months}
          />
          <h2 className="text-md md:text-2xl uppercase text-center text-gray-700">Total Revenue</h2>
        </section>

        <section className="w-4/5 mx-auto my-16 flex flex-col gap-10">
          <LineChart
            data={[
              9000, 12000, 12000, 9000, 1000, 5000, 4000, 1200, 1100, 1500,
              2000, 5000,
            ]}
            backgroundColor={"hsla(29,80%,40%,0.4)"}
            borderColor={"hsl(29,80%,40%)"}
            label="Discount"
            labels={months}
          />
          <h2 className="text-md md:text-2xl uppercase text-center text-gray-700">Discount Allotted</h2>
        </section>
      </main>
    </div>
  );
};

export default BarCharts;
