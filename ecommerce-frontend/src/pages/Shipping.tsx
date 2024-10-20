import Breadcrumb from "@/components/Shared/Breadcrumb";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Link } from "react-router-dom";

const Shipping = () => {
  const [shippingInfo, setShippingInfo] = useState({
    address: "",
    city: "",
    state: "",
    country: "",
    pinCode: "",
  });
  const changeHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setShippingInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="p-6">
        <div className="mt-16">
          <Breadcrumb pageName="cart" currentPage="Address" />
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            Shipping Address
          </h2>

          <div className="mt-4">
            <label htmlFor="address" className="block text-gray-700 mb-1">
              Address
            </label>
            <input
              required
              type="text"
              placeholder="Address"
              name="address"
              value={shippingInfo.address}
              onChange={changeHandler}
              className="w-full rounded-lg border py-2 px-3"
            />
          </div>

          <div className="mt-4">
            <label htmlFor="city" className="block text-gray-700 mb-1">
              City
            </label>
            <input
              required
              type="text"
              placeholder="City"
              name="city"
              value={shippingInfo.city}
              onChange={changeHandler}
              className="w-full rounded-lg border py-2 px-3"
            />
          </div>
          <div className="mt-4">
            <label htmlFor="city" className="block text-gray-700 mb-1">
              Country
            </label>
            <select
              name="country"
              required
              value={shippingInfo.country}
              onChange={changeHandler}
              className="w-full rounded-lg border py-2 px-3"
            >
              <option value="">Choose Country</option>
              <option value="india">India</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <label htmlFor="state" className="block text-gray-700 mb-1">
                State
              </label>
              <input
                required
                type="text"
                placeholder="State"
                name="state"
                value={shippingInfo.state}
                onChange={changeHandler}
                className="w-full rounded-lg border py-2 px-3"
              />
            </div>
            <div>
              <label htmlFor="zip" className="block text-gray-700 mb-1">
                PIN Code
              </label>
              <input
                required
                type="number"
                placeholder="Pin Code"
                name="pinCode"
                value={shippingInfo.pinCode}
                onChange={changeHandler}
                className="w-full rounded-lg border py-2 px-3"
              />
            </div>
          </div>
          <div>
            <Button className="w-full">Pay Now</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shipping;
