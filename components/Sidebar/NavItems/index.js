import { useState } from "react";
import { FiUsers, FiMoreVertical, FiEdit, FiTrash2 } from "react-icons/fi";
import { AiOutlineHeart } from "react-icons/Ai";
import { useSelector } from "react-redux";
import DropdownMenu from "../../shared/DropdownMenu";

const NavItems = ({ showSidebar }) => {
  const groups = useSelector((state) => state.groupsReducer.groups);

  const [selectedGroupMenu, setSelectedGroupMenu] = useState(null);
  const [selectedGroupAmount, setSelectedGroupAmount] = useState(null);

  const menuItems = [
    { text: "Edit Group", icon: FiEdit },
    { text: "Delete Group", icon: FiTrash2 },
  ];

  const handleGroupMenuClick = (selectedGroupId) => {
    console.log(selectedGroupId);
  };

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

                  {selectedGroupMenu === selectedNavItem && (
                    <div className={`ml-auto`}>
                      <DropdownMenu
                        menuItems={menuItems}
                        onMouseEnter={() => {
                          setSelectedGroupMenu(selectedNavItem);
                        }}
                        onMouseLeave={() => {
                          setSelectedGroupMenu(null);
                          setSelectedGroupAmount(null);
                        }}
                        menuBtn={
                          <FiMoreVertical
                            onClick={() => handleGroupMenuClick(selectedNavItem)}
                            size={20}
                          />
                        }
                      />
                    </div>
                  )}

                  {selectedGroupAmount !== selectedNavItem && (
                    <p
                      className={`ml-auto bg-gray-600 px-2 py-0.5 rounded-md`}
                      onMouseEnter={() => {
                        setSelectedGroupMenu(selectedNavItem);
                        setSelectedGroupAmount(selectedNavItem);
                      }}
                      onMouseLeave={() => setSelectedGroupMenu(null)}
                    >
                      {group.people?.length}
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
