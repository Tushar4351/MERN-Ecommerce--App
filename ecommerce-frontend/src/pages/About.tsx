import Breadcrumb from "@/components/Shared/Breadcrumb";
import React from "react";
import { FaRegClock } from "react-icons/fa";
import { IoBagHandleOutline } from "react-icons/io5";
import { LiaShippingFastSolid } from "react-icons/lia";
import { FaRegCreditCard } from "react-icons/fa6";
interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: <IoBagHandleOutline className="text-4xl text-gray-700" />,
    title: "Shop online",
    description:
      "Explore a vast collection of premium clothing from the comfort of your home.",
  },
  {
    icon: <LiaShippingFastSolid className="text-4xl text-gray-700" />,
    title: "Free shipping",
    description:
      "Enjoy the convenience of free shipping on all orders, nationwide",
  },
  {
    icon: <FaRegClock className="text-4xl text-gray-700" />,
    title: "Return policy",
    description:
      "Your satisfaction is our priority. Return any product you are not satisfied with.",
  },
  {
    icon: <FaRegCreditCard className="text-4xl text-gray-700" />,
    title: "Payment methods",
    description:
      "Choose from a variety of secure payment methods to complete your transactions with ease.",
  },
];

const About: React.FC = () => {
    
  return (
    <div >
      <div className="mt-12">
        <Breadcrumb pageName="Home" currentPage="About Us" />
      </div>
      <div className="h-80">
        <img
          src="/about.avif"
          alt="about image"
          className="box-border w-full h-full rounded-inherit object-cover object-top"
        />
      </div>

      <div className="flex h-1/2 m-20 flex-wrap items-center justify-center gap-8 p-4 ">
        {features.map((feature, index) => (
          <div key={index} className="max-w-xs text-left">
            <div className="mb-2 flex items-center  space-x-2">
              {feature.icon}
              <h3 className="text-lg font-semibold">{feature.title}</h3>
            </div>
            <p className="text-gray-500">{feature.description}</p>
          </div>
        ))}
      </div>
      <div className="max-w-[1400px] m-10 h-1/2 text-center flex items-center justify-center font-sora-medium p-10 md:p-2 text-xl sm:text-2xl md:text-4xl mx-auto">
        <p>
          At the heart of <span className="text-green-150">NexCartia lies a distinctive philosophy</span> that transcends
          trends and embraces the essence of enduring style. Our collections are
          a harmonious blend of sophistication, versatility, and modernity,
          carefully curated to enhance your personal expression. We believe that
          fashion should empower, inspire, and reflect the unique narrative of
          every individual. Serrena is not just about clothing; it's about
          embracing a lifestyle that embraces the artistry of fashion and the
          poetry of self-expression.
        </p>
      </div>
    </div>
  );
};

export default About;
