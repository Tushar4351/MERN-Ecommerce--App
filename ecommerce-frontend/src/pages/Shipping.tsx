import React, { useState, ChangeEvent } from "react";
import { MapPin, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import Breadcrumb from "@/components/Shared/Breadcrumb";
import { Link } from "react-router-dom";

interface Address {
  street: string;
  city: string;
  state: string;
  country: string;
  pinCode: string;
  lat: number | null;
  lng: number | null;
}

interface Location {
  lat: number;
  lng: number;
}

const AddressForm: React.FC = () => {
  const [address, setAddress] = useState<Address>({
    street: "",
    city: "",
    state: "",
    country: "",
    pinCode: "",
    lat: null,
    lng: null,
  });

  const [userLocation, setUserLocation] = useState<Location | null>(null);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
    setAddress((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const getLocation = (): void => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          const location: Location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setUserLocation(location);
        },
        (error: GeolocationPositionError) => {
          console.error("Error getting location:", error);
        }
      );
    }
  };

  const mapSrc: string = address.street
    ? `https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${encodeURIComponent(
        `${address.street}, ${address.city}, ${address.state}, ${address.country}`
      )}`
    : `https://www.google.com/maps/embed/v1/view?key=YOUR_API_KEY&center=0,0&zoom=2`;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mt-12">
        <Breadcrumb pageName="cart" currentPage="Shipping" />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid md:grid-cols-2 gap-8"
      >
        <div className="space-y-6 md:border-r-2 md:pr-8">
          <h2 className="text-2xl font-bold mb-6">Shipping Address</h2>

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              onClick={getLocation}
              className="mb-6 w-full flex items-center justify-center gap-2"
              variant="outline"
            >
              <MapPin className="h-5 w-5" />
              Use Current Location
            </Button>
          </motion.div>

          <div className="space-y-4 flex flex-col">
            <div>
              <label className="block text-gray-700 mb-1">Address</label>
              <input
                required
                type="text"
                name="street"
                placeholder="Address"
                value={address.street}
                onChange={handleInputChange}
                className="w-full rounded-lg border py-2 px-3"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1">City</label>
              <input
                required
                type="text"
                placeholder="City"
                name="city"
                value={address.city}
                onChange={handleInputChange}
                className="w-full rounded-lg border py-2 px-3"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1">State</label>
              <input
                required
                type="text"
                placeholder="State"
                name="state"
                value={address.state}
                onChange={handleInputChange}
                className="w-full rounded-md border p-2"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Country</label>
              <select
                name="country"
                required
                value={address.country}
                onChange={handleInputChange}
                className="w-full rounded-md border p-2"
              >
                <option value="">Select Country</option>
                <option value="India">India</option>
                <option value="USA">USA</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 mb-1">PIN Code</label>
              <input
                required
                type="number"
                placeholder="Pin Code"
                name="pinCode"
                value={address.pinCode}
                onChange={handleInputChange}
                className="w-full rounded-md border p-2"
              />
            </div>
          </div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link to="/payment">
              <Button className="w-full mt-6 flex items-center justify-center gap-2">
                <CreditCard className="h-5 w-5" />
                Proceed to Payment
              </Button>
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="h-[600px] relative rounded-lg overflow-hidden shadow-lg"
        >
          <iframe
            src={mapSrc}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0"
          />
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="absolute bottom-4 left-4 bg-white px-3 py-1 rounded-full shadow-lg flex items-center"
          >
            <MapPin className="h-5 w-5 text-blue-600 mr-2" />
            <span className="text-sm font-medium">Your Location</span>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AddressForm;
