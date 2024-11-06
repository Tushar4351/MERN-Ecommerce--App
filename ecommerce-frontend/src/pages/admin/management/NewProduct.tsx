import { useState, ChangeEvent, FormEvent } from "react";
import AdminSidebar from "../../../components/Shared/admin/AdminSidebar";
import { Button } from "@/components/ui/button";
import { UserReducerInitialState } from "@/types/reducer-types";
import { useSelector } from "react-redux";
import { useNewProductMutation } from "@/redux/api/productApi";
import { useNavigate } from "react-router-dom";
import { responseToast } from "@/utils/Features";

const NewProduct = () => {
  const { user } = useSelector(
    (state: { userReducer: UserReducerInitialState }) => state.userReducer
  );
  const [name, setName] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [price, setPrice] = useState<number>(1000);
  const [stock, setStock] = useState<number>(1);
  // const [description, setDescription] = useState<string>("");
  const [photoPrev, setPhotoPrev] = useState<string>("");
  const [photo, setPhoto] = useState<File>();

  const [newProduct] = useNewProductMutation();

  const navigate = useNavigate();

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // setIsLoading(true);
    try {
      if (!name || !price || stock < 0 || !category) return;

      //  if (!photo.file || photo.file.length === 0) return;

      const formData = new FormData();

      formData.set("name", name);
      formData.set("price", price.toString());
      formData.set("stock", stock.toString());
      formData.set("category", category);
      formData.set("photo", photo);

      //  formData.set("description", description);
      // photo.file.forEach((file) => {
      //   formData.append("photos", file);
      // });
      const userId = user?._id;
      const res = await newProduct({ id: userId!, formData });

      responseToast(res, navigate, "/admin/product");
    } catch (error) {
      console.log(error);
    }
    // finally {
    //   setIsLoading(false);
    // }
  };
  const changeImageHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const file: File | undefined = e.target.files?.[0];

    const reader: FileReader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setPhotoPrev(reader.result);
          setPhoto(file);
        }
      };
    }
  };

  return (
    <div className="admin-container h-screen bg-gray-50/50">
      <div>
        {" "}
        <AdminSidebar />{" "}
      </div>
      <main className="product-management flex justify-center items-center p-4 overflow-y-auto">
        <article
          style={{ height: "85vh" }}
          className=" w-full max-w-lg p-8 flex flex-col relative rounded-xl bg-white text-gray-700 shadow-md"
        >
          <form onSubmit={submitHandler}>
            <h2 className="antialiased tracking-normal text-2xl font-semibold leading-snug text-center mb-5">
              New Product
            </h2>
            <div>
              <label className="block mt-2 mb-2 text-sm font-medium text-gray-900">
                Name
              </label>
              <input
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                required
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label className="block mt-2 mb-2 text-sm font-medium text-gray-900">
                Price
              </label>
              <input
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                required
                type="number"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
              />
            </div>
            <div>
              <label className="block mt-2 mb-2 text-sm font-medium text-gray-900">
                Stock
              </label>
              <input
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                required
                type="number"
                placeholder="Stock"
                value={stock}
                onChange={(e) => setStock(Number(e.target.value))}
              />
            </div>
            <div>
              <label className="block mt-2 mb-2 text-sm font-medium text-gray-900">
                Category
              </label>
              <input
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                required
                type="text"
                placeholder="eg. jeans, t-shirt etc"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>

            <div>
              <label className="block mt-2 mb-2 text-sm font-medium text-gray-900">
                Photo
              </label>
              <input
                className="bg-gray-50 border mb-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                required
                type="file"
                onChange={changeImageHandler}
              />
            </div>

            {photo && (
              <img className="rounded-xl" src={photoPrev} alt="New Image" />
            )}

            <Button variant="destructive" className="w-full">
              Create Product
            </Button>
          </form>
        </article>
      </main>
    </div>
  );
};

export default NewProduct;
