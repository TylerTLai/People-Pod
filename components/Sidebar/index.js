import { useDispatch, useSelector } from "react-redux";

import { openModal, setFormType } from "../../redux/slices/modalSlice";
import { toggleSidebar } from "../../redux/slices/sidebarSlice";

import NavItems from "./NavItems";

import IconButton from "../shared/IconButton";
import SvgPlusCircle from "../shared/Icons/PlusCircle";
import SvgSidebar from "../shared/Icons/Sidebar";

const Sidebar = () => {
  const dispatch = useDispatch();
  const showSidebar = useSelector((state) => state.sidebarReducer.showSidebar);

  const handleSidebarToggle = () => {
    dispatch(toggleSidebar());
  };

  const handleAddGroup = () => {
    dispatch(setFormType("addGroup"));
    dispatch(openModal());
  };

  const sidebarDesktopWidth = showSidebar ? "sm:w-72" : "sm:w-20";
  const sidebarMobileWidth = showSidebar && "w-full";
  const sidebarAnimation = showSidebar
    ? "transform translate-x-0 transition duration-200 ease-in-out"
    : "transform -translate-x-full sm:-translate-x-0 transition duration-200 ease-in-out";

  return (
    <>
      <aside
        className={`absolute inset-y-0 max-h-full flex flex-col pt-5 bg-gray-800 text-white overflow-x-hidden overflow-y-auto z-30 sm:static sm:min-h-full
        ${sidebarDesktopWidth}
        ${sidebarMobileWidth}
        ${sidebarAnimation}`}
      >
        <IconButton
          className="hidden mt-3 ml-5 text-gray-300 mb-9 hover:text-white sm:inline-flex"
          dark
          onClick={handleSidebarToggle}
          icon={<SvgSidebar width={37} height={37} />}
        />
        <div
          className={`items-center flex ${
            showSidebar ? "sm:flex" : "sm:hidden"
          } min-w-full`}
        >
          <p className="ml-5 font-bold tracking-wide uppercase">Groups</p>
          <IconButton
            className="p-1 m-2 ml-auto text-gray-300 focus:outline-none hover:text-white"
            dark
            onClick={handleAddGroup}
            icon={<SvgPlusCircle width={27} height={27} />}
          />
        </div>
        <NavItems showSidebar={showSidebar} />
      </aside>
    </>
  );
};

export default Sidebar;
