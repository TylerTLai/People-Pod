import { useState } from "react";
import { FiUsers, FiMoreVertical, FiEdit, FiTrash2 } from "react-icons/fi";
import { AiOutlineHeart } from "react-icons/Ai";
import { useDispatch, useSelector } from "react-redux";
import Dropdown from "../../shared/Dropdown";
import axiosInstance from "../../../config/axios";
import { setAllGroups, setGroupId } from "../../../redux/slices/groupSlice";
import { openModal, setFormData, setFormType } from "../../../redux/slices/modalSlice";

const NavItems = ({ showSidebar }) => {
  const dispatch = useDispatch();
  const groups = useSelector((state) => state.groupsReducer.groups);

  const [selectedGroupMenu, setSelectedGroupMenu] = useState(null);
  const [selectedGroupAmount, setSelectedGroupAmount] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  const dropdownItems = [
    { id: 1, text: "Edit Group", icon: FiEdit },
    { id: 2, text: "Delete Group", icon: FiTrash2 },
  ];

  const handleGroupMenuClick = () => {
    setShowDropdown((showDropdown) => !showDropdown);
  };

  const handleDropdownItemClick = (selectedGroup, dropdownItemText) => {
    if (dropdownItemText === "Edit Group") {
      editGroup(selectedGroup);
      setShowDropdown(false);
    } else if (dropdownItemText === "Delete Group") {
      deleteGroup(selectedGroup.groupId);
      setShowDropdown(false);
    }
  };

  const deleteGroup = async (groupId) => {
    try {
      const res = await axiosInstance.delete("groups", {
        data: { groupId },
      });

      const { deletedGroup, groups } = res.data;
      dispatch(setAllGroups(groups));
      dispatch(setGroupId(null));
    } catch (error) {
      console.error("error message: ", error.message);
    }
  };

  const editGroup = (selectedGroup) => {
    dispatch(setFormType("editGroup"));
    dispatch(setFormData(selectedGroup));
    dispatch(openModal());
  };

  const handleMouseLeave = () => {
    // If dropdown is open, disable onMouseLeave.
    if (!showDropdown) {
      setSelectedGroupMenu(null);
      setSelectedGroupAmount(null);
    }
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

                  {/* The group more vertical menu */}
                  {selectedGroupMenu === selectedNavItem && (
                    <div className={`ml-auto py-1`}>
                      <FiMoreVertical
                        onClick={() => handleGroupMenuClick(selectedNavItem)}
                        onMouseEnter={() => {
                          setSelectedGroupMenu(selectedNavItem);
                        }}
                        onMouseLeave={handleMouseLeave}
                        size={20}
                      />
                      <Dropdown
                        handleDropdownItemClick={handleDropdownItemClick}
                        dropdownItems={dropdownItems}
                        showDropdown={showDropdown}
                        selectedGroup={group}
                      />
                    </div>
                  )}

                  {/* The number of people within a group */}
                  {selectedGroupAmount !== selectedNavItem && (
                    <p
                      className={`ml-auto bg-gray-600 px-2 py-0.5 rounded-md`}
                      onMouseEnter={() => {
                        setSelectedGroupMenu(selectedNavItem);
                        setSelectedGroupAmount(selectedNavItem);
                      }}
                      onMouseLeave={() => setSelectedGroupMenu(null)}
                    >
                      {group.people ? group.people.length : 0}
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
