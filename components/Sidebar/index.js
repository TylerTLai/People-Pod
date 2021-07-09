import { FiPlusCircle, FiUsers, FiSidebar } from "react-icons/fi";
import { AiOutlineHeart } from "react-icons/Ai";
import { useState } from "react";
import Link from "next/link";
import NavItems from "./NavItems";
import UserProfile from "./UserProfile";

const Sidebar = () => {
  const [showSidebar, setShowSidebar] = useState(true);

  const handleSidebarToggle = () => {
    setShowSidebar((prev) => !prev);
  };

  return (
    <div
      className={`max-h-full flex flex-col pt-6 bg-gray-800 text-white w-${
        showSidebar ? "64" : "0.5"
      }`}
    >
      <FiSidebar
        className={`ml-5 ${!showSidebar && "mr-5"} mb-9 mt-3 hover:cursor-pointer`}
        size={!showSidebar ? 24 : 34}
        onClick={handleSidebarToggle}
      />
      <div className={`max-h-full flex items-center ${!showSidebar && "hidden"}`}>
        <p className="font-bold uppercase tracking-wide ml-5">Groups</p>
        <button
          className="p-1 m-2 ml-auto focus:outline-none"
          type="button"
          aria-label="new group"
          aria-hidden="true"
        >
          <FiPlusCircle size={24} color="#FFFFFF" />
        </button>
      </div>
      <NavItems showSidebar={showSidebar} />
      <UserProfile showSidebar={showSidebar} />
    </div>
  );
};

export default Sidebar;
