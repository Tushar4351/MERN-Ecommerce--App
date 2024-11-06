import Breadcrumb from "@/components/Shared/Breadcrumb";
import { ProductSkeleton } from "@/components/Shared/Loader";
import ProductCard from "@/components/Shared/ProductCard";
import {
  useCategoriesQuery,
  useSearchProductsQuery,
} from "@/redux/api/productApi";
import { CustomError } from "@/types/api-types";
import { useState } from "react";
import toast from "react-hot-toast";
import { BiSearch } from "react-icons/bi";

const Search = () => {
  const {
    data: categoriesResponse,
    isLoading: loadingCategories,
    isError,
    error,
  } = useCategoriesQuery("");

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [maxPrice, setMaxPrice] = useState(100000);
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);

  const {
    isLoading: productLoading,
    data: searchedData,
    isError: productIsError,
    error: productError,
  } = useSearchProductsQuery({
    search,
    sort,
    category,
    page,
    price: maxPrice,
  });

  const addToCartHandler = () => {};

  const isPrevPage = page > 1;
  const isNextPage = page < 4;

  if (isError) {
    const err = error as CustomError;
    toast.error(err.data.message);
  }
  if (productIsError) {
    const err = productError as CustomError;
    toast.error(err.data.message);
  }

  return (
    <div>
      <div className="mt-12">
        <Breadcrumb pageName="Home" currentPage="Products" />
      </div>
      <div className="flex gap-8 p-8">
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
              {!loadingCategories &&
                categoriesResponse?.categories.map((i) => (
                  <option key={i} value={i}>
                    {i.toUpperCase()}
                  </option>
                ))}
            </select>
          </div>
        </aside>
        <main className="w-full">
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
          {productLoading ? (
            <ProductSkeleton />
          ) : (
            <div className="flex flex-wrap overflow-y-auto">
              {searchedData?.products.map((i) => (
                <ProductCard
                  key={i._id}
                  productId={i._id}
                  name={i.name}
                  price={i.price}
                  stock={i.stock}
                  handler={addToCartHandler}
                  photo={i.photo}
                />
              ))}
            </div>
          )}
          {searchedData && searchedData.totalPage > 1 && (
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
          )}
        </main>
      </div>
    </div>
  );
};

export default Search;
