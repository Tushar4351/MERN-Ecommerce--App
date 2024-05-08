import AdminSidebar from "@/components/Shared/admin/AdminSidebar";
import { DoughnutChart, PieChart } from "@/components/Shared/admin/Charts";
import { categories } from "../../../assets/data.json";

const PieCharts = () => {
  return (
    <div className="admin-container min-h-screen xl:grid xl:grid-cols-6 bg-gray-50/50">
    <div >
      <AdminSidebar />
    </div>
      
      <main className="chart-container col-span-4 md:col-span-5 g-clip-border rounded-xl bg-white m-4  shadow-md p-5 overflow-y-auto">
        <h1 className="text-md md:text-3xl font-bold mt-10 ml-8">Pie & Doughnut Charts</h1>
       
        <section className="w-80 mx-auto my-16">
          <div className="max-w-96 mx-auto md:mt-24 mb-n1">
            <PieChart
              labels={["Processing", "Shipped", "Delivered"]}
              data={[12, 9, 13]}
              backgroundColor={[
                `hsl(110,80%, 80%)`,
                `hsl(110,80%, 50%)`,
                `hsl(110,40%, 50%)`,
              ]}
              offset={[0, 0, 50]}
            />
          </div>
          <h2 className="text-md md:text-2xl uppercase text-center text-gray-700">Order Fulfillment Ratio</h2>
        </section>

        <section className="w-80 mx-auto my-16">
          <div>
            <DoughnutChart
              labels={categories.map((i) => i.heading)}
              data={categories.map((i) => i.value)}
              backgroundColor={categories.map(
                (i) => `hsl(${i.value * 4},${i.value}%, 50%)`
              )}
              legends={false}
              offset={[0, 0, 0, 80]}
            />
          </div>
          <h2 className="text-md md:text-2xl uppercase text-center text-gray-700">Product Categories Ratio</h2>
        </section>

        <section className="w-80 mx-auto my-16">
          <div>
            <DoughnutChart
              labels={["In Stock", "Out Of Stock"]}
              data={[40, 20]}
              backgroundColor={["hsl(269,80%,40%)", "rgb(53, 162, 255)"]}
              legends={false}
              offset={[0, 80]}
              cutout={"70%"}
            />
          </div>
          <h2 className="text-md md:text-2xl uppercase text-center text-gray-700">Stock Availability</h2>
        </section>
        <section className="w-80 mx-auto my-16">
          <div>
            <DoughnutChart
              labels={[
                "Marketing Cost",
                "Discount",
                "Burnt",
                "Production Cost",
                "Net Margin",
              ]}
              data={[32, 18, 5, 20, 25]}
              backgroundColor={[
                "hsl(110,80%,40%)",
                "hsl(19,80%,40%)",
                "hsl(69,80%,40%)",
                "hsl(300,80%,40%)",
                "rgb(53, 162, 255)",
              ]}
              legends={false}
              offset={[20, 30, 20, 30, 80]}
            />
          </div>
          <h2 className="text-md md:text-2xl uppercase text-center text-gray-700">Revenue Distribution</h2>
        </section>

        <section className="w-80 mx-auto my-16">
          <div>
            <PieChart
              labels={[
                "Teenager(Below 20)",
                "Adult (20-40)",
                "Older (above 40)",
              ]}
              data={[30, 250, 70]}
              backgroundColor={[
                `hsl(10, ${80}%, 80%)`,
                `hsl(10, ${80}%, 50%)`,
                `hsl(10, ${40}%, 50%)`,
              ]}
              offset={[0, 0, 50]}
            />
          </div>
          <h2 className="text-md md:text-2xl uppercase text-center text-gray-700">Users Age Group</h2>
        </section>

        <section className="w-80 mx-auto my-16">
          <div>
            <DoughnutChart
              labels={["Admin", "Customers"]}
              data={[40, 250]}
              backgroundColor={[`hsl(335, 100%, 38%)`, "hsl(44, 98%, 50%)"]}
              offset={[0, 80]}
            />
          </div>
        </section>
       

      </main>
    </div>
  );
};

export default PieCharts;