import { useState, ChangeEvent } from "react";
import AdminSidebar from "../AdminSidebar";
import { Button } from "@/components/ui/button"

const NewProduct = () => {
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<number>();
  const [stock, setStock] = useState<number>();
  const [photo, setPhoto] = useState<string>();

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

  return (
    <div className="admin-container h-screen bg-gray-50/50">
      <div>
        {" "}
        <AdminSidebar />{" "}
      </div>
      <main className="product-management flex justify-center items-center gap-2 p-16">
        <article className="w-full max-w-lg p-20 flex flex-col relative rounded-xl bg-white text-gray-700 shadow-md overflow-y-auto">
          <form>
            <h2 className="antialiased tracking-normal text-2xl font-semibold leading-snug text-center">
              New Product
            </h2>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900">
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
              <label className="block mb-2 text-sm font-medium text-gray-900">
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
              <label className="block mb-2 text-sm font-medium text-gray-900">
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
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Photo
              </label>
              <input required type="file" onChange={changeImageHandler} />
            </div>

            {photo && <img src={photo} alt="New Image" />}

            <Button variant="destructive">Destructive</Button>
          </form>
        </article>
      </main>
    </div>
  );
};

export default NewProduct;
