import { FiPlusCircle, FiUsers, FiSidebar } from "react-icons/fi";
import { AiOutlineHeart } from "react-icons/Ai";
import { useState } from "react";
import Link from "next/link";
import NavItems from "./NavItems";
import UserProfile from "./UserProfile";
import IconButton from "../shared/IconButton";

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
      <IconButton
        className={`${
          !showSidebar && "mr-5"
        } ml-5 mb-9 mt-3 hover:text-white text-gray-300`}
        dark
        onClick={handleSidebarToggle}
        icon={<FiSidebar size={27} />}
      />
      <div className={`max-h-full flex items-center ${!showSidebar && "hidden"}`}>
        <p className="font-bold uppercase tracking-wide ml-5">Groups</p>
        <IconButton
          className={`p-1 m-2 ml-auto focus:outline-none hover:text-white text-gray-300`}
          dark
          icon={<FiPlusCircle size={27} />}
        />
      </div>
      <NavItems showSidebar={showSidebar} />
      <UserProfile showSidebar={showSidebar} />
    </div>
  );
};

export default Sidebar;
