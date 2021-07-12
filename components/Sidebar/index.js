import { FiPlusCircle, FiSidebar } from "react-icons/fi";
import { useState } from "react";
import { useDispatch } from "react-redux";

import NavItems from "./NavItems";
import UserProfile from "./UserProfile";
import IconButton from "../shared/IconButton";
import { openModal, setFormType } from "../../redux/slices/modalSlice";

const Sidebar = () => {
  const dispatch = useDispatch();
  const [showSidebar, setShowSidebar] = useState(true);

  const handleSidebarToggle = () => {
    setShowSidebar((prev) => !prev);
  };

  const handleAddGroup = () => {
    dispatch(setFormType("addGroup"));
    dispatch(openModal());
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
          onClick={handleAddGroup}
          icon={<FiPlusCircle size={27} />}
        />
      </div>
      <NavItems showSidebar={showSidebar} />
      <UserProfile showSidebar={showSidebar} />
    </div>
  );
};

export default Sidebar;
