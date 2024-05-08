import { useState } from "react";
import AdminSidebar from "../../../components/Shared/admin/AdminSidebar";
import { OrderItemType, OrderType } from "../../../types"
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const img =
  "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXN8ZW58MHx8MHx8&w=1000&q=804";

const orderItems: OrderItemType[] = [
  {
    name: "Puma Shoes",
    photo: img,
    _id: "asdsaasdas",
    quantity: 4,
    price: 2000,
  },
];

const TransactionManagement = () => {
  const [order, setOrder] = useState<OrderType>({
    name: "Abhishek Singh",
    address: "77 Black Street",
    city: "Neyword",
    state: "Nevada",
    country: "India",
    pinCode: 2434341,
    status: "Processing",
    subtotal: 4000,
    discount: 1200,
    shippingCharges: 0,
    tax: 200,
    total: 4000 + 200 + 0 - 1200,
    orderItems,
    _id: "asdnasjdhbn",
  });

  const {
    name,
    address,
    city,
    country,
    state,
    pinCode,
    subtotal,
    shippingCharges,
    tax,
    discount,
    total,
    status,
  } = order;

  const updateHander = () => {
    setOrder((prev) => ({
      ...prev,
      status: prev.status === "Processing" ? "Shipped" : "Delivered",
    }));
  };

  return (
    <div className="admin-container h-screen bg-gray-50/50">
      <div>
        {" "}
        <AdminSidebar />{" "}
      </div>
      <main className="product-management gap-4 flex flex-col sm:flex-row justify-center items-center p-4 overflow-y-auto">
      <section
  style={{ height: "85vh" }}
  className="w-full max-w-md p-10 flex flex-col relative rounded-xl bg-white text-gray-700 shadow-md  overflow-y-auto"
>
  <h2 className="antialiased uppercase tracking-normal text-2xl font-semibold leading-snug text-center mb-5">
    Order Items
  </h2>

  {order.orderItems.map((item) => (
    <ProductCard
      key={item._id} // Add unique key prop here
      name={item.name}
      photo={item.photo}
      _id={item._id}
      quantity={item.quantity}
      price={item.price}
    />
  ))}
</section>


        <article
          style={{ height: "85vh" }}
          className="shipping-info-card w-full max-w-sm p-8 flex flex-col relative rounded-xl bg-white text-gray-700 shadow-md"
        >
          <div className="flex flex-col gap-5">
            <div>
              <h1 className="antialiased tracking-normal text-2xl font-semibold leading-snug text-center uppercase mb-5">
                Order Info
              </h1>
              <h5 className="font-bold">User Info</h5>
              <p>Name: {name}</p>
              <p>
                Address:{" "}
                {`${address}, ${city}, ${state}, ${country} ${pinCode}`}
              </p>
            </div>
            <div>
              <h5 className="font-bold">Amount Info</h5>
              <p>Subtotal: {subtotal}</p>
              <p>Shipping Charges: {shippingCharges}</p>
              <p>Tax: {tax}</p>
              <p>Discount: {discount}</p>
              <p>Total: {total}</p>
            </div>
            <div>
              <h5 className="font-bold">Status Info</h5>
              <p>
                Status:{" "}
                <span
                  className={
                    status === "Delivered"
                      ? "text-indigo-600"
                      : status === "Shipped"
                      ? "text-green-500"
                      : "text-red-600"
                  }
                >
                  {status}
                </span>
              </p>
            </div>
            <div>
              <Button variant="destructive" onClick={updateHander} className="w-full">
                Update
              </Button>
            </div>
          </div>
        </article>
      </main>
    </div>
  );
};

const ProductCard = ({ name, photo, price, quantity, _id }: OrderItemType) => (
  <div className="w-full transaction-product-card flex flex-row items-center justify-center p-1 gap-5">
    <img className="w-14 h-14 rounded-lg" src={photo} alt={name} />
    <div className="flex gap-12 ">
      <Link to={`/product/${_id}`}>{name}</Link>
      <span>
        ${price} X {quantity} = ${price * quantity}
      </span>
    </div>
  </div>
);

export default TransactionManagement;
