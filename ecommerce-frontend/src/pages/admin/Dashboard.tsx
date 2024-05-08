import { BsSearch } from "react-icons/bs";
import AdminSidebar from "../../components/Shared/admin/AdminSidebar";
import { FaRegBell } from "react-icons/fa";
import userImg from "../../assets/userpic.png";
import { HiTrendingDown, HiTrendingUp } from "react-icons/hi";
import data from "../../assets/data.json";
import { BarChart, DoughnutChart } from "../../components/Shared/admin/Charts";
import { BiMaleFemale } from "react-icons/bi";
import Table from "../../components/Shared/admin/DashBoardTable";
const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50/50 ">
      <div className=" grid xl:grid-cols-6">
        <div>
          <AdminSidebar />
        </div>

        <main className="col-span-4 md:col-span-5 overflow-y-auto">
          {/*Bar section  */}

          <div className="m-5">
            <div className="flex flex-row mt-5 gap-2 sm:gap-10">
              <div className="flex pl-2 shadow-md items-center w-full rounded-xl bg-white">
                <BsSearch />
                <input
                  type="text"
                  className="w-full border-none bg-transparent px-4 py-2 text-gray-400 outline-none focus:outline-none"
                  placeholder="Search for data, users, docs"
                />
              </div>
              <div className="flex gap-2 sm:gap-5">
                <FaRegBell className="h-10 w-10 cursor-pointer" />
                <img
                  className="h-10 w-10 cursor-pointer"
                  src={userImg}
                  alt="User"
                />
              </div>
            </div>
          </div>

          {/*widget section  */}
          <section className="m-5">
            <div className="grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
              <WidgetItem
                percent={40}
                amount={true}
                value={340000}
                heading="Revenue"
                color="rgb(0,115,255)"
              />
              <WidgetItem
                percent={-14}
                value={400}
                heading="Users"
                color="rgb(0 198 202)"
              />
              <WidgetItem
                percent={80}
                value={23000}
                heading="Transactions"
                color="rgb(255 196 0)"
              />
              <WidgetItem
                percent={30}
                value={1000}
                heading="Products"
                color="rgb(76 0 255)"
              />
            </div>
          </section>

          {/*Graph section  */}

          <section className="m-5">
            <div className="grid md:grid-cols-4 gap-5">
              {/*revenue-chart section  */}

              <div className="col-span-3 w-11/12 md:w-full  bg-clip-border rounded-xl bg-white text-gray-700 shadow-md p-5 flex flex-col justify-center text-center gap-5">
                <h2 className="block antialiased tracking-normal text-md md:text-2xl font-semibold leading-snug ">
                  Revenue & Transaction
                </h2>
                <BarChart
                  data_2={[300, 144, 433, 655, 237, 755, 190]}
                  data_1={[200, 444, 343, 556, 778, 455, 990]}
                  title_1="Revenue"
                  title_2="Transaction"
                  bgColor_1="rgb(0,115,255)"
                  bgColor_2="rgba(53,162,235,0.8)"
                />
              </div>

              {/*dashboard section  */}

              <div className="col-span-3 w-11/12 md:col-span-1 bg-clip-border rounded-xl bg-white text-gray-700 shadow-md flex justify-center text-center flex-col gap-5 p-10">
                <h2 className="block antialiased tracking-normal text-2xl font-semibold leading-snug ">
                  Inventory
                </h2>

                <div>
                  {data.categories.map((i) => (
                    <CategoryItem
                      key={i.heading}
                      heading={i.heading}
                      value={i.value}
                      color={`hsl(${i.value * 4},${i.value}%,50%)`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="transaction-container m-5">
            <div className="gender-chart">
              <h2>Gender Ratio</h2>

              <DoughnutChart
                labels={["Female", "Male"]}
                data={[12, 19]}
                backgroundColor={["hsl(340,82%,56%)", "rgba(53,162,235,0.8)"]}
                cutout={90}
              />

              <p>
                <BiMaleFemale />
              </p>
            </div>

            <Table data={data.transaction} />
            <style>
              {`
      @media screen and (max-width: 1200px) {
        .transaction-container {
          justify-content: center;
          flex-wrap: wrap;
          padding: 2rem;
          height: unset;
        }
      }
    `}
            </style>
          </section>
        </main>
      </div>
    </div>
  );
};
interface WidgetItemProps {
  heading: string;
  value: number;
  percent: number;
  color: string;
  amount?: boolean;
}

const WidgetItem = ({
  heading,
  value,
  percent,
  color,
  amount = false,
}: WidgetItemProps) => (
  <article className="widget">
    <div className=" flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
      <div className="flex flex-row justify-between items-center mr-5">
        <div className="p-4">
          <p className="block antialiased text-sm leading-normal font-normal text-blue-gray-60">
            {heading}
          </p>
          <h4 className="block antialiased tracking-normal text-2xl font-semibold leading-snug text-blue-gray-900">
            {amount ? `$${value}` : value}
          </h4>
        </div>
        <div
          className="widget-circle"
          style={{
            background: `conic-gradient(
        ${color} ${(Math.abs(percent) / 100) * 360}deg,
        rgb(255, 255, 255) 0
      )`,
          }}
        >
          <span
            style={{
              color,
            }}
          >
            {percent}%
          </span>
        </div>
      </div>

      <div className="border-t  border-blue-gray-50 p-4">
        <p className="antialiased text-base leading-relaxed font-normal text-blue-gray-600">
          {percent > 0 ? (
            <span className="text-green-500 flex flex-row gap-1 items-center">
              <HiTrendingUp /> +{percent}%{" "}
            </span>
          ) : (
            <span className="text-red-500 flex flex-row gap-1 items-center">
              <HiTrendingDown /> {percent}%{" "}
            </span>
          )}
        </p>
      </div>
    </div>
  </article>
);

interface CategoryItemProps {
  color: string;
  value: number;
  heading: string;
}

const CategoryItem = ({ color, value, heading }: CategoryItemProps) => (
  <div className="category-item flex flex-col">
    <div className="flex justify-between mb-1 mt-3">
      <span className="text-base font-medium ">{heading}</span>
      <span className="text-sm font-medium">{value}%</span>
    </div>
    <div className="w-full bg-gray-200 rounded-full h-2.5">
      <div
        className="h-2.5 rounded-full"
        style={{
          backgroundColor: color,
          width: `${value}%`,
        }}
      ></div>
    </div>
  </div>
);

export default Dashboard;
