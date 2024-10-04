import React from "react";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaDiscord,
  FaTwitter,
  FaGithub,
  
} from "react-icons/fa";
const Footer = () => {
  return (
    <footer className=" bg-black-150">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <Link to={"/"} className="flex items-center">
              <img src={logo} className="h-8 me-3" alt="FlowBite Logo" />
              <span className="self-center text-3xl font-semibold whitespace-nowrap text-white">
                NexCartia
              </span>
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
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-white sm:text-center">
            © 2024{" "}
            <Link to="/" className="text-white">
            NexCartia™
            </Link>
            . All Rights Reserved.
          </span>
          <div className="flex mt-4 sm:justify-center sm:mt-0">
            <ul className="flex flex-wrap items-center mb-5  text-gray-500 gap-5 dark:text-gray-400">
              <li>
                <Link
                  to="#"
                  className="text-white hover:text-green-150  ms-5"
                >
                  <FaFacebook className="w-6 h-6" />
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-white hover:text-green-150 ms-5"
                >
                  <FaDiscord className="w-6 h-6" />
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-white hover:text-green-150 ms-5"
                >
                  <FaTwitter className="w-6 h-6" />
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-white hover:text-green-150 ms-5"
                >
                  <FaGithub className="w-6 h-6" />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
