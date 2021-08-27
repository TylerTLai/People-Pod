import { useState } from "react";
import { useRouter } from "next/router";

import { useUser } from "@auth0/nextjs-auth0";
import Dropdown from "../../shared/Dropdown/";
import SvgLogOut from "../../shared/Icons/LogOut";

const dropdownItems = [{ id: 1, text: "Log out", icon: SvgLogOut }];

const UserProfile = () => {
  const { user } = useUser();
  const [showDropdown, setShowDropdown] = useState(false);
  const router = useRouter();
  const handleDropdownItemClick = () => {
    router.push("/api/auth/logout");
  };

  const handleClick = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div>
      <div
        className={`flex items-center rounded-lg hover:cursor-pointer`}
        onClick={handleClick}
      >
        <Dropdown
          reverseIcons
          showDropdown={showDropdown}
          handleDropdownItemClick={handleDropdownItemClick}
          dropdownItems={dropdownItems}
        />
        <img
          src="https://dummyimage.com/302x302/F3F4F7/8693ac"
          alt="user name"
          className={`object-cover w-10 h-10 rounded-full`}
        />
        <div>
          <h2 className="text-sm font-medium tracking-widest text-gray-800 uppercase title-font ml-5">
            {user.nickname}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
