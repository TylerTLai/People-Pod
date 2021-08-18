import { useDispatch } from "react-redux";
import { useUser } from "@auth0/nextjs-auth0";

import Link from "next/link";

import { filterPeople } from "../../../redux/slices/peopleSlice";
import SvgSearch from "../../shared/Icons/Search";
import UserProfile from "../../Sidebar/UserProfile";

const DashboardNavbar = () => {
  const dispatch = useDispatch();
  const { user } = useUser();
  const userEmail = user?.email;

  const handleInputChange = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    dispatch(filterPeople({ searchTerm, userEmail }));
  };

  return (
    <nav className="grid sm:grid-cols-layout border-b py-3 px-6 justify-center items-center">
      <Link href="/">
        <a className="hidden sm:inline text-xl uppercase font-bold cursor-pointer w-64 mr-1">
          People Pod
        </a>
      </Link>
      <div className="relative w-full">
        <SvgSearch className="absolute top-3.5 left-4 text-gray-400" />
        <input
          className="px-10 py-2 rounded-full w-full placeholder-gray-500 border-2 border-gray-200 hover:border-gray-400 transition duration-300 ease-in-out focus:outline-none"
          type="text"
          placeholder="Find a person..."
          onChange={handleInputChange}
        />
      </div>
      <div className="w-full flex justify-end">
        <UserProfile />
      </div>
    </nav>
  );
};

export default DashboardNavbar;
