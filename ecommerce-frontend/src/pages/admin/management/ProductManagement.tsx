import { useState, ChangeEvent } from "react";
import AdminSidebar from "../../../components/Shared/admin/AdminSidebar";
import { Button } from "@/components/ui/button";
const img =
  "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXN8ZW58MHx8MHx8&w=1000&q=804";

const ProductManagement = () => {
  const [name, setName] = useState<string>("Puma Shoes");
  const [price, setPrice] = useState<number>(1000);
  const [stock, setStock] = useState<number>(10);
  const [photo, setPhoto] = useState<string>(img);

  const [nameUpdate, setNameUpdate] = useState<string>(name);
  const [priceUpdate, setPriceUpdate] = useState<number>(price);
  const [stockUpdate, setStockUpdate] = useState<number>(stock);
  const [photoUpdate, setPhotoUpdate] = useState<string>(photo);

  const changeImageHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const file: File | undefined = e.target.files?.[0];

    const reader: FileReader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        if (typeof reader.result === "string") setPhoto(reader.result);
      };
    }
  };
  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setName(nameUpdate);
    setPrice(priceUpdate);
    setStock(stockUpdate);
    setPhoto(photoUpdate);
  };

  return (
    <div className="admin-container h-screen bg-gray-50/50 overflow-y-auto">
      <div>
        {" "}
        <AdminSidebar />{" "}
      </div>
      <main className="product-management flex flex-col sm:flex-row gap-4 justify-center items-center p-4 overflow-y-auto">
        <section style={{height:"85vh"}} className="w-full max-w-lg p-10 flex flex-col relative rounded-xl bg-white text-gray-700 shadow-md  overflow-y-auto">
        <strong className="mb-5 text-slate-400">ID - asnmdkasndmsan</strong>
          <img className="" src={photo} alt="Product" />
          <p className="text-xl text-center uppercase mt-10 mb-3">{name}</p>
          {stock > 0 ? (
            <span className="absolute top-3 right-4 text-green-500">{stock} Available</span>
          ) : (
            <span className="text-red-600 absolute top-3 right-4">Not Available</span>
          )}
          <h3 className="text-3xl font-bold text-center">${price}</h3>
        </section>
        <article style={{height:"85vh"}} className="w-full max-w-md p-8 flex flex-col relative rounded-xl bg-white text-gray-700 shadow-md">
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
                required
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setNameUpdate(e.target.value)}
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
                onChange={(e) => setPriceUpdate(Number(e.target.value))}
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
                onChange={(e) => setStockUpdate(Number(e.target.value))}
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
              <img className="rounded-xl w-28 h-28" src={photo} alt="New Image" />
            )}
            <div>
            <Button variant="destructive" className="w-full">Update</Button>
             </div>
           
          </form>
        </article>
      </main>
    </div>
  );
};

export default ProductManagement;
