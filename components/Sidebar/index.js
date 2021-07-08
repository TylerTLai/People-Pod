import { FiPlusCircle, FiUsers } from "react-icons/fi";
import { AiOutlineHeart } from "react-icons/Ai";
import { useDispatch, useSelector } from "react-redux";
import { openModal, setFormType } from "../../redux/slices/modalSlice";

import Link from "next/link";

const Sidebar = () => {
  const dispatch = useDispatch();

  const handleAddGroup = () => {
    dispatch(setFormType("addGroup"));
    dispatch(openModal());
  };

  return (
    <div className="flex-col w-full md:flex md:flex-row md:min-h-screen pt-6 border-r border-gray-200">
      <div className="flex flex-col flex-shrink-0 w-full md:w-64">
        <div className="flex items-center">
          <p className="font-bold uppercase tracking-wide ml-5">Groups</p>
          <button
            className="p-1 m-2 ml-auto focus:outline-none"
            type="button"
            aria-label="new group"
            aria-hidden="true"
            onClick={handleAddGroup}
          >
            <FiPlusCircle size={24} color="#1F2937" />
          </button>
        </div>
        <nav className="flex-grow pb-4 pr-4 md:block md:pb-0 md:overflow-y-auto">
          <ul className="text-gray-500">
            <li>
              <a
                className="inline-flex items-center px-4 py-2 mt-2 transition duration-300 ease-in-out border-l-4 hover:border-gray-800 focus:outline-none hover:text-gray-800"
                href="#"
              >
                <FiUsers size={20} />
                <span className="ml-4">Everyone</span>
              </a>
            </li>
            <li>
              <a
                className="inline-flex items-center px-4 py-2 mt-2 transition duration-300 ease-in-out border-l-4 hover:border-gray-800 focus:outline-none hover:text-gray-800"
                href="#"
              >
                <AiOutlineHeart size="18" />
                <span className="ml-4">Favorites</span>
              </a>
            </li>
          </ul>
        </nav>
        <div className="flex items-center w-full p-4 rounded-lg ">
          <img
            src="https://dummyimage.com/302x302/F3F4F7/8693ac"
            alt="user name"
            className="object-cover w-10 h-10 mr-4 rounded-full"
          />
          <div>
            <h2 className="text-sm font-medium tracking-widest text-gray-800 uppercase title-font">
              John Doe
            </h2>
            <p className="text-blueGray-500">Admin</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
