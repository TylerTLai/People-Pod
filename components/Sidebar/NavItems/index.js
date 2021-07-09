import { FiUsers } from "react-icons/fi";
import { AiOutlineHeart } from "react-icons/Ai";
const NavItems = ({ showSidebar }) => {
  return (
    <nav className={`${!showSidebar && "hidden"} h-full text-gray-300`}>
      <ul>
        <li>
          <a
            className="flex items-center px-4 py-2 mt-2 transition duration-300 ease-in-out border-l-4 border-transparent hover:border-white focus:outline-none hover:text-white"
            href="#"
          >
            <FiUsers size={20} />
            <p className="ml-4">Everyone</p>
          </a>
        </li>
        <li>
          <a
            className="flex items-center px-4 py-2 mt-2 transition duration-300 ease-in-out border-l-4 border-transparent hover:border-white focus:outline-none hover:text-white"
            href="#"
          >
            <AiOutlineHeart size="18" />
            <p className="ml-4">Favorites</p>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default NavItems;
