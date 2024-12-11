import { useState, ChangeEvent, useEffect, FormEvent } from "react";
import AdminSidebar from "../../../components/Shared/admin/AdminSidebar";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import { Trash } from "lucide-react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import {
  useDeleteProductMutation,
  useProductDetailsQuery,
  useUpdateProductMutation,
} from "@/redux/api/productApi";
import { RootState } from "@/redux/store";
import { responseToast } from "@/utils/Features";

const ProductManagement = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);

  const params = useParams();
  const navigate = useNavigate();

  const { data, isError } = useProductDetailsQuery(params.id!);

  const { price, photos, name, stock, category } = data?.product || {
    photo: [],
    category: "",
    name: "",
    stock: 0,
    price: 0,
    // description: "",
  };

  const [priceUpdate, setPriceUpdate] = useState<number>(price);
  const [stockUpdate, setStockUpdate] = useState<number>(stock);
  const [nameUpdate, setNameUpdate] = useState<string>(name);
  const [categoryUpdate, setCategoryUpdate] = useState<string>(category);
  const [photoUpdate, setPhotoUpdate] = useState<string>("");
  const [photoFile, setPhotoFile] = useState<File>();
  // const [descriptionUpdate, setDescriptionUpdate] =
  //   useState<string>(description);
  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  const changeImageHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const file: File | undefined = e.target.files?.[0];

    const reader: FileReader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setPhotoUpdate(reader.result);
          setPhotoFile(file);
        }
      };
    }
  };

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formData = new FormData();

      if (nameUpdate) formData.set("name", nameUpdate);
      //   if (descriptionUpdate) formData.set("description", descriptionUpdate);
      if (priceUpdate) formData.set("price", priceUpdate.toString());
      if (stockUpdate !== undefined)
        formData.set("stock", stockUpdate.toString());

      if (categoryUpdate) formData.set("category", categoryUpdate);
      if (photoFile) formData.set("photo", photoFile);

      const userId = user?._id;
      const producId = data?.product._id;
      const res = await updateProduct({
        formData,
        userId: userId!,
        productId: producId!,
      });

      responseToast(res, navigate, "/admin/product");
    } catch (error) {
      console.log(error);
    }
  };

  const deleteHandler = async () => {
    const userId = user?._id;
    const producId = data?.product._id;

    const res = await deleteProduct({
      userId: userId!,
      productId: producId!,
    });

    responseToast(res, navigate, "/admin/product");
  };

  useEffect(() => {
    if (data) {
      setNameUpdate(data.product.name);
      setPriceUpdate(data.product.price);
      setStockUpdate(data.product.stock);
      setCategoryUpdate(data.product.category);
      // setDescriptionUpdate(data.product.description);
    }
  }, [data]);
  if (isError) return <Navigate to={"/404"} />;
  return (
    <div className="admin-container h-screen bg-gray-50/50 overflow-y-auto">
      <div>
        {" "}
        <AdminSidebar />{" "}
      </div>
      <main className="product-management flex flex-col sm:flex-row gap-4 justify-center items-center p-4 overflow-y-auto">
        <section
          style={{ height: "85vh" }}
          className="w-full max-w-lg p-10 flex flex-col relative rounded-xl bg-white text-gray-700 shadow-md  overflow-y-auto"
        >
          <strong className="mb-5 text-slate-400">
            ID - {data?.product._id}
          </strong>
          <img className="" src={`${photos?.[0]?.url}`} alt="Product" />
          <p className="text-xl text-center uppercase mt-10 mb-3">{name}</p>
          {stock > 0 ? (
            <span className="absolute top-3 right-4 text-green-500">
              {stock} Available
            </span>
          ) : (
            <span className="text-red-600 absolute top-3 right-4">
              Not Available
            </span>
          )}
          <h3 className="text-3xl font-bold text-center">₹{price}</h3>
        </section>
        <article
          style={{ height: "85vh" }}
          className="w-full max-w-md p-8 flex flex-col relative rounded-xl bg-white text-gray-700 shadow-md"
          
        >
             <Button
            className="bg-black-text hover:bg-black-text/90 w-1/6"
            onClick={deleteHandler}
          >
            <Trash className="w-6 h-6 text-white " />
          </Button>
          <form onSubmit={submitHandler}>
            <h2 className="antialiased tracking-normal text-2xl font-semibold leading-snug text-center mb-5">
              MANAGE
            </h2>
            <div>
              <label className="block mt-2 mb-2 text-sm font-medium text-gray-900">
                Name
              </label>
              <input
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                type="text"
                placeholder="Name"
                value={nameUpdate}
                onChange={(e) => setNameUpdate(e.target.value)}
              />
            </div>
            <div>
              <label className="block mt-2 mb-2 text-sm font-medium text-gray-900">
                Price
              </label>
              <input
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                type="number"
                placeholder="Price"
                value={priceUpdate}
                onChange={(e) => setPriceUpdate(Number(e.target.value))}
              />
            </div>
            <div>
              <label className="block mt-2 mb-2 text-sm font-medium text-gray-900">
                Stock
              </label>
              <input
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                type="number"
                placeholder="Stock"
                value={stockUpdate}
                onChange={(e) => setStockUpdate(Number(e.target.value))}
              />
            </div>
            <div>
              <label className="block mt-2 mb-2 text-sm font-medium text-gray-900">
                Category
              </label>
              <input
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                type="text"
                placeholder="eg. jeans, t-shirt etc"
                value={categoryUpdate}
                onChange={(e) => setCategoryUpdate(e.target.value)}
              />
            </div>
            <div>
              <label className="block mt-2 mb-2 text-sm font-medium text-gray-900">
                Photo
              </label>
              <input
                className="bg-gray-50 border mb-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                type="file"
                onChange={changeImageHandler}
              />
            </div>

            {photoUpdate && (
              <img
                className="rounded-xl w-28 h-28"
                src={photoUpdate}
                alt="New Image"
              />
            )}
            <div>
              <Button variant="destructive" className="w-full">
                Update
              </Button>
            </div>
          </form>
        </article>
      </main>
    </div>
  );
};

export default ProductManagement;
