import React from "react";
import { FaAngleRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
interface BreadcrumbProps {
  pageName: string;
  currentPage: string;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ pageName, currentPage }) => {
  return (
    <div className="w-full md:h-80 flex flex-col items-center justify-center p-8">
      <h1 className="text-3xl sm:text-6xl lg:text-8xl text-black-heading font-sora-semibold mb-4 uppercase">
        {currentPage}
      </h1>

      <div className="flex items-center gap-2 text-md">
        <Link
          to={pageName === "Home" ? "/" : `/${pageName}`}
          className="text-gray-600 hover:underline transition-colors"
        >
          {pageName}
        </Link>

        <FaAngleRight className="text-gray-400" />
        <span className="text-green-150">{currentPage}</span>
      </div>
    </div>
  );
};

export default Breadcrumb;
