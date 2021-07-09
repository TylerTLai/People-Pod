import Link from "next/Link";
import { FiSearch } from "react-icons/fi";

const Navbar = () => {
  return (
    <div className="border-b py-3 px-6 flex sm:justify-start justify-center items-center sm:space-x-20 md:space-x-12 lg:space-x-8 xl:space-x-4 2xl:space-x-0">
      <Link href="/">
        <a className="hidden sm:inline text-xl uppercase font-bold cursor-pointer w-64">
          People Pod
        </a>
      </Link>
      <div className="relative w-full">
        <FiSearch className="absolute top-3 left-4" />
        <input
          className="px-10 py-2 rounded w-full lg:w-1/2 placeholder-gray-500 border border-gray-200 hover:border-gray-800 transition duration-300 ease-in-out focus:outline-none"
          type="text"
          placeholder="Find a person..."
        />
      </div>
    </div>
  );
};

export default Navbar;
