import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useUser } from "@auth0/nextjs-auth0";
import axiosInstance from "../../../config/axios";
import { setAllGroups, setGroupId } from "../../../redux/slices/groupSlice";
import { openModal, setFormData, setFormType } from "../../../redux/slices/modalSlice";
import { setAllPeople } from "../../../redux/slices/peopleSlice";
import Dropdown from "../../shared/Dropdown";
import SvgEdit from "../../shared/Icons/Edit";
import SvgHeart from "../../shared/Icons/Heart";
import SvgMoreVertical from "../../shared/Icons/MoreVertical";
import SvgTrash2 from "../../shared/Icons/Trash2";
import SvgUsers from "../../shared/Icons/Users";

const NavItems = ({ showSidebar }) => {
  const dispatch = useDispatch();
  const groups = useSelector((state) => state.groupsReducer.groups);
  const { user } = useUser();
  const userEmail = user?.email;

  const [selectedGroupMenu, setSelectedGroupMenu] = useState(null);
  const [selectedGroupAmount, setSelectedGroupAmount] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  const dropdownItems = [
    { id: 1, text: "Edit Group", icon: SvgEdit },
    { id: 2, text: "Delete Group", icon: SvgTrash2 },
  ];

  const handleDropdownItemClick = (selectedGroup, dropdownItemText) => {
    if (dropdownItemText === "Edit Group") {
      editGroup(selectedGroup);
      setShowDropdown(false);
    } else if (dropdownItemText === "Delete Group") {
      deleteGroup(selectedGroup.groupId);
      setShowDropdown(false);
    }
  };

  const handleGroupMenuClick = () => {
    setShowDropdown((showDropdown) => !showDropdown);
  };

  const handleNavItemClick = async (groupId) => {
    try {
      const res = await axiosInstance.get("groups", { params: { groupId, userEmail } });
      dispatch(setAllPeople(res.data.people));
    } catch (error) {
      console.log(error);
    }
  };

  const handleEveryoneClick = async () => {
    try {
      const res = await axiosInstance.get("people", { params: { userEmail } });
      dispatch(setAllPeople(res.data));
    } catch (error) {
      console.log(error);
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
    <nav className={`flex ${showSidebar ? "sm:flex" : "sm:hidden"} h-full text-gray-300 mb-10`}>
      <ul className="min-w-full">
        <li
          onClick={handleEveryoneClick}
          className="flex items-center px-4 py-2 mt-2 transition duration-300 ease-in-out min-w-full border-l-4 border-transparent hover:border-white focus:outline-none hover:text-white hover:cursor-pointer"
        >
          <SvgUsers width={20} height={20} />
          <p className="ml-4">Everyone</p>
        </li>
        <li className="flex items-center px-4 py-2 mt-2 transition duration-300 ease-in-out min-w-full border-l-4 border-transparent hover:border-white focus:outline-none hover:text-white hover:cursor-pointer">
          <SvgHeart width={20} height={20} />
          <p className="ml-4">Favorites</p>
        </li>
        <hr className="my-3 border-gray-700 min-w-full" />

        {groups.map((group, selectedNavItem) => {
          return (
            <li
              onClick={() => handleNavItemClick(group.groupId)}
              key={group.groupId}
              className="flex items-center px-4 py-2 mt-2 transition duration-300 ease-in-out min-w-full border-l-4 border-transparent hover:border-white focus:outline-none hover:text-white hover:cursor-pointer"
            >
              <SvgUsers width={20} height={20} />
              <p className="ml-4">{group.name}</p>

              {/* The group more vertical menu */}
              {selectedGroupMenu === selectedNavItem && (
                <div className={`ml-auto py-1`}>
                  <SvgMoreVertical
                    onClick={() => handleGroupMenuClick(selectedNavItem)}
                    onMouseEnter={() => {
                      setSelectedGroupMenu(selectedNavItem);
                    }}
                    onMouseLeave={handleMouseLeave}
                    width={20}
                    height={20}
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
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default NavItems;
