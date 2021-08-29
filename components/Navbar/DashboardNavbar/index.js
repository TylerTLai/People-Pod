import { useDispatch } from "react-redux";
import { useUser } from "@auth0/nextjs-auth0";
import Link from "next/link";

import { filterPeople } from "../../../redux/slices/peopleSlice";

import UserProfile from "../../Sidebar/UserProfile";

import SvgSearch from "../../shared/Icons/Search";
import SvgPeoplePodLogo from "../../shared/Icons/PeoplePodLogo";

const DashboardNavbar = () => {
  const dispatch = useDispatch();
  const { user } = useUser();
  const userEmail = user?.email;

  const handleInputChange = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    dispatch(filterPeople({ searchTerm, userEmail }));
  };

  return (
    <nav className="z-50 flex items-center justify-center px-6 py-3 space-x-2 bg-white border-b-2">
      {/* logo */}
      <div className="flex items-center w-64 space-x-3">
        <SvgPeoplePodLogo width={36} height={36} />
        <Link href="/">
          <a className="text-xl font-bold uppercase cursor-pointer">People Pod</a>
        </Link>
      </div>

      {/* search bar */}
      <div className="relative w-5/12">
        <SvgSearch className="absolute top-3.5 left-4 text-gray-400" />
        <input
          className="min-w-full px-10 py-2 placeholder-gray-500 transition duration-300 ease-in-out border-2 border-gray-200 rounded-full hover:border-gray-400 focus:outline-none"
          type="text"
          placeholder="Find a person..."
          onChange={handleInputChange}
        />
      </div>

      {/* user profile */}
      <div className="flex justify-end flex-1">
        <UserProfile />
      </div>
    </nav>
  );
};

export default DashboardNavbar;
