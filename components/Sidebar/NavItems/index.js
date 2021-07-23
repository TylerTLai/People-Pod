import { useState } from "react";
import { FiUsers, FiMoreVertical } from "react-icons/fi";
import { AiOutlineHeart } from "react-icons/Ai";
import { useSelector } from "react-redux";

const NavItems = ({ showSidebar }) => {
  const groups = useSelector((state) => state.groupsReducer.groups);

  const [selectedMoreVertical, setSelectedMoreVertical] = useState(null);
  const [selectedGroupNumber, setSelectedGroupNumber] = useState(null);

  return (
    <nav className={`${!showSidebar && "hidden"} h-full text-gray-300 mb-10`}>
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
        <hr className="my-3 border-gray-700" />
        {groups.map((group, selectedNavItem) => {
          return (
            <>
              <li key={group.groupId}>
                <a
                  className="flex items-center px-4 py-2 mt-2 transition duration-300 ease-in-out border-l-4 border-transparent hover:border-white focus:outline-none hover:text-white"
                  href="#"
                >
                  <FiUsers size={20} />
                  <p className="ml-4">{group.name}</p>

                  {selectedMoreVertical === selectedNavItem && (
                    <FiMoreVertical
                      className={`ml-auto my-1`}
                      size={20}
                      onMouseEnter={() => {
                        setSelectedMoreVertical(selectedNavItem);
                      }}
                      onMouseLeave={() => {
                        setSelectedMoreVertical(null);
                        setSelectedGroupNumber(null);
                      }}
                    />
                  )}

                  {selectedGroupNumber !== selectedNavItem && (
                    <p
                      className={`ml-auto bg-gray-600 px-2 py-0.5 rounded-md`}
                      onMouseEnter={() => {
                        setSelectedMoreVertical(selectedNavItem);
                        setSelectedGroupNumber(selectedNavItem);
                      }}
                      onMouseLeave={() => setSelectedMoreVertical(null)}
                    >
                      10
                    </p>
                  )}
                </a>
              </li>
            </>
          );
        })}
      </ul>
    </nav>
  );
};

export default NavItems;
