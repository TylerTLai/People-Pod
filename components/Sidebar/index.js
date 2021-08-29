import { useDispatch, useSelector } from "react-redux";

import NavItems from "./NavItems";
import IconButton from "../shared/IconButton";
import SvgPlusCircle from "../shared/Icons/PlusCircle";
import SvgSidebar from "../shared/Icons/Sidebar";
import { openModal, setFormType } from "../../redux/slices/modalSlice";
import { toggleSidebar } from "../../redux/slices/sidebarSlice";

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

  const sidebarDesktopWidth = showSidebar ? "sm:w-72" : "sm:w-18";
  const sidebarMobileWidth = showSidebar && "w-full";

  return (
    <>
      <aside
        className={`absolute top-5 sm:top-0 inset-y-0 min-h-full flex flex-col pt-6 bg-gray-800 text-white overflow-x-hidden overflow-y-auto z-10
        ${sidebarDesktopWidth}
        ${sidebarMobileWidth}
         transform
        ${showSidebar ? "translate-x-0" : "-translate-x-full sm:-translate-x-0"}
        transition duration-200 ease-in-out`}
      >
        <IconButton
          className={`${
            !showSidebar && "mr-5"
          } ml-5 mb-9 mt-3 hover:text-white text-gray-300 hidden sm:inline-flex`}
          dark
          onClick={handleSidebarToggle}
          icon={<SvgSidebar width={27} height={27} />}
        />
        <div
          className={`items-center flex ${
            showSidebar ? "sm:flex" : "sm:hidden"
          } min-w-full`}
        >
          <p className="font-bold uppercase tracking-wide ml-5">Groups</p>
          <IconButton
            className={`p-1 m-2 ml-auto focus:outline-none hover:text-white text-gray-300`}
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
