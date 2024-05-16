import ProductCard from "@/components/Shared/ProductCard";
import { useState } from "react";
import { BiSearch } from "react-icons/bi";

const Search = () => {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [maxPrice, setMaxPrice] = useState(100000);
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);

  const addToCartHandler = () => {};

  const isPrevPage = page > 1;
  const isNextPage = page < 4;
  return (
    <div
      style={{ height: "calc(100vh - 6.5vh)" }}
      className="gap-8 product-search-page flex p-8 mt-16 justify-start items-stretch"
    >
      <aside className="min-w-[20rem] p-8 shadow-md flex flex-col justify-start gap-10">
        <h2 className="text-3xl font-semibold">Filters</h2>
        <div>
          <h4 className="text-lg font-semibold mb-2">Sort</h4>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="px-4 w-full border-2 py-2 rounded-md text-sm outline-none"
          >
            <option value="">None</option>
            <option value="asc">Price (Low to High)</option>
            <option value="dsc">Price (High to Low)</option>
          </select>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-2">
            Max Price: {maxPrice || ""}
          </h4>
          <input
            type="range"
            min={100}
            max={100000}
            value={maxPrice}
            className="w-full"
            onChange={(e) => setMaxPrice(Number(e.target.value))}
          />
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-2">Category</h4>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-4 w-full border-2 py-2 rounded-md text-sm outline-none"
          >
            <option value="">ALL</option>
            <option value="men">MEN</option>
            <option value="women">WOMEN</option>
            <option value="kids">KIDS</option>
          </select>
        </div>
      </aside>
      <main className="w-full">
        <h1 className="text-3xl font-semibold text-center mb-5">Products</h1>
        <div className="flex w-full mb-5 rounded bg-white">
          <input
            className="w-full border-none bg-gray-100 rounded-xl px-4 py-1 text-gray-400 outline-none focus:outline-none"
            type="text"
            placeholder="Search by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <button
            type="button"
            className="m-2 rounded bg-blue-600 px-4 py-2 text-white"
          >
            <BiSearch className="fill-current h-6 w-6" />{" "}
            {/* Using the BiSearch icon */}
          </button>
        </div>
        <div className="flex flex-wrap overflow-y-auto">
          <ProductCard
            productId="absjsjwjww"
            name="MackBook"
            photo="https://pixahive.com/wp-content/uploads/2020/10/Gym-shoes-153180-pixahive.jpg"
            price={100}
            stock={10}
            handler={() => {
              addToCartHandler;
            }}
          />
        </div>
        <article className="flex justify-center items-center gap-4">
          <button
            className="px-4 py-2 rounded-md bg-green-150 text-white hover:bg-green-150/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!isPrevPage}
            onClick={() => setPage((prev) => prev - 1)}
          >
            Prev
          </button>
          <span>{page} of 4</span>
          <button
            className="px-4 py-2 rounded-md bg-green-150 text-white hover:bg-green-150/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!isNextPage}
            onClick={() => setPage((prev) => prev + 1)}
          >
            Next
          </button>
        </article>
      </main>
    </div>
  );
};

export default Search;
