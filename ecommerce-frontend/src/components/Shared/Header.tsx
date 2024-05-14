import { Link } from "react-router-dom";
import logo from "../../assets/logo.svg";
import { IoSearchOutline } from "react-icons/io5";
import { BsCart3 } from "react-icons/bs";
import { AiOutlineUser } from "react-icons/ai";
import { LuLogOut } from "react-icons/lu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";

const user = {
  _id: "gdfg",
  role: "admin",
};

const Header = () => {
  return (
    <nav className="bg-white fixed w-full z-20 top-0 start-0 border-b border-gray-200">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-3">
        <Link to={"/"} className="flex items-center space-x-3">
          <img src={logo} className="h-8" alt="Flowbite Logo" />
          <span className="self-center text-2xl text-green-150 font-semibold">
            NexCartia
          </span>
        </Link>

        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto "
          id="navbar-sticky"
        >
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8  md:flex-row md:mt-0 md:border-0 md:bg-white">
            <li>
              <Link
                to={"/"}
                className="block py-2 px-3 text-gray-900 rounded hover:text-green-150 md:p-0"
                aria-current="page"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className="block py-2 px-3 text-gray-900 rounded hover:text-green-150 md:p-0"
              >
                About
              </Link>
            </li>

            <li>
              <Link
                to="#"
                className="block py-2 px-3 text-gray-900 rounded hover:text-green-150 md:p-0"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div className="flex space-x-3 justify-center items-center">
          <Link to={"/search"}>
            <IoSearchOutline className="w-5 h-5" />
          </Link>
          <Link to={"/cart"}>
            <BsCart3 className="w-5 h-5" />
          </Link>

          {user?._id ? (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <AiOutlineUser className="w-5 h-5" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {user.role === "admin" && (
                    <Link to="/admin/dashboard">
                      <DropdownMenuItem> Admin</DropdownMenuItem>
                    </Link>
                  )}

                  <DropdownMenuItem>Orders</DropdownMenuItem>
                  <DropdownMenuItem>
                    
                    <button className="flex justify-center items-center space-x-2">
                    <span>Logout</span> <LuLogOut className="w-4 h-4" /> 
                    </button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <Link to={"/login"}>
              <Button className="bg-green-150 hover:bg-green-150/80">
                Login
              </Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
