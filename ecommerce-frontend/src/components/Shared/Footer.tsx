import React from "react";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import { FaFacebook, FaDiscord, FaTwitter, FaGithub } from "react-icons/fa";
const Footer = () => {
  return (
    <footer className=" max-w-7xl mx-auto w-full py-12 ">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
          <Link to={"/"} className="flex items-center ">
              <img src={logo} className="h-8 mb-3 rounded-lg" alt="FlowBite Logo" />
            </Link>
            <p className="text-gray-400">Your trusted fashion companion</p>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4">NAVIGATION</h4>
            <ul className="space-y-2">
              {["Home", "Shop", "About", "Contact"].map((item) => (
                <li key={item}>
                  <Link
                    to={`/${item.toLowerCase()}`}
                    className="text-gray-400 hover:text-gray-200"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4">CATEGORIES</h4>
            <ul className="space-y-2">
              {["Men", "Women", "Kids"].map((item) => (
                <li key={item}>
                  <Link
                    to={`/category/${item.toLowerCase()}`}
                    className="text-gray-400 hover:text-gray-200"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="flex">
              <Link to="/facebook">
                <FaFacebook className="w-6 h-6 text-white hover:text-green-150 ms-5" />
              </Link>
              <Link to="/discord">
                <FaDiscord className=" w-6 h-6 text-white hover:text-green-150 ms-5" />
              </Link>
              <Link to="/twitter">
                <FaTwitter className=" w-6 h-6 text-white hover:text-green-150 ms-5" />
              </Link>
              <Link to="/github">
                <FaGithub className=" w-6 h-6 text-white hover:text-green-150 ms-5" />
              </Link>
            </div>
          </div>
        </div>

        <div className="text-center mt-12 text-white">
          All Rights Reserved By ©NexCartia
        </div>
      </div>
    </footer>
  );
};

export default Footer;
{
  /* <footer className=" bg-black-150">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <Link to={"/"} className="flex items-center">
              <img src={logo} className="h-8 me-3" alt="FlowBite Logo" />
            </Link>
          </div>

          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium sm:mb-0 ">
            <li>
              <Link to="/about" className="me-4 md:me-6 text-green-150 text-lg">
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/privacy-policy"
                className="me-4 md:me-6 text-green-150 text-lg"
              >
                About
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-green-150 text-lg">
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
      
      </div>
    </footer> */
}
