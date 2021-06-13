import Link from "next/Link";

const Navbar = () => {
  return (
    <div className="border-b py-3 px-6 flex sm:justify-start justify-center items-center sm:space-x-20 md:space-x-40">
      <Link href="/">
        <a className="hidden sm:inline text-xl uppercase font-bold cursor-pointer">
            People Pod
        </a>
      </Link>
      <input
        className="px-5 py-2 rounded w-full sm:w-1/2 placeholder-gray-500 border border-gray-200 hover:border-gray-800 transition duration-300 ease-in-out focus:outline-none"
        type="text"
        placeholder="Find a person..."
      />
    </div>
  );
};

export default Navbar;
