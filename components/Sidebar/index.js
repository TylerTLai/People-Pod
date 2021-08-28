import { useState } from "react";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";
import IconButton from "../shared/IconButton";
import NavItems from "./NavItems";
import SvgPlusCircle from "../shared/Icons/PlusCircle";
import SvgSidebar from "../shared/Icons/Sidebar";
import { openModal, setFormType } from "../../redux/slices/modalSlice";
import { containerVariants } from "./animation";

const Sidebar = () => {
  const dispatch = useDispatch();
  const [showSidebar, setShowSidebar] = useState(true);

  const handleSidebarToggle = () => {
    setShowSidebar((showSidebar) => !showSidebar);
  };

  const handleAddGroup = () => {
    dispatch(setFormType("addGroup"));
    dispatch(openModal());
  };

  return (
    <motion.aside
      variants={containerVariants}
      initial="initial"
      animate={!showSidebar ? "shrink" : "show"}
      className={`h-full flex flex-col pt-6 bg-gray-800 text-white w-72 overflow-y-auto z-50`}
    >
      <IconButton
        className={`${
          !showSidebar && "mr-5"
        } ml-5 mb-9 mt-3 hover:text-white text-gray-300`}
        dark
        onClick={handleSidebarToggle}
        icon={<SvgSidebar width={27} height={27} />}
      />
      <div className={`max-h-full flex items-center ${!showSidebar && "hidden"}`}>
        <p className="font-bold uppercase tracking-wide ml-5">Groups</p>
        <IconButton
          className={`p-1 m-2 ml-auto focus:outline-none hover:text-white text-gray-300`}
          dark
          onClick={handleAddGroup}
          icon={<SvgPlusCircle width={27} height={27} />}
        />
      </div>
      <NavItems showSidebar={showSidebar} />
    </motion.aside>
  );
};

export default Sidebar;
