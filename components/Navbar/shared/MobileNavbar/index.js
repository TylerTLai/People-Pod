import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useUser } from "@auth0/nextjs-auth0";

import Dropdown from "../../../shared/Dropdown";
import SvgLayout from "../../../shared/Icons/Layout";
import SvgLogIn from "../../../shared/Icons/LogIn";
import SvgLogOut from "../../../shared/Icons/LogOut";
import SvgMenu from "../../../shared/Icons/Menu";
import SvgPeoplePodLogo from "../../../shared/Icons/PeoplePodLogo";

const MobileNavbar = () => {
  const { user } = useUser();
  const router = useRouter();

  const generateDropdownItems = () => {
    if (user && router.route === "/") {
      return [
        { id: 1, text: "Dashboard", icon: SvgLayout },
        { id: 2, text: "Log Out", icon: SvgLogOut },
      ];
    } else if (user && router.route === "/dashboard") {
      return [{ id: 1, text: "Log Out", icon: SvgLogOut }];
    } else if (!user) {
      return [{ id: 1, text: "Log In", icon: SvgLogIn }];
    }
  };

  const [isOpen, setIsOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleHamburgerMenuClick = () => {
    setIsOpen(!isOpen);
    setShowDropdown((showDropdown) => !showDropdown);
  };

  const handleDropdownItemClick = (selectedItem, dropdownItemText) => {
    if (dropdownItemText === "Log In") {
      router.push("/api/auth/login");
    } else if (dropdownItemText === "Log Out") {
      router.push("/api/auth/logout");
    } else if (dropdownItemText === "Dashboard") {
      router.push("/dashboard");
    }
  };

  return (
    <div className="pb-12">
      <nav className="fixed left-0 right-0 z-50 border-b-2 bg-white border-gray-100">
        <div className="flex items-center px-6 py-4">
          <div>
            <Link href="/">
              <a className="text-xl uppercase font-bold cursor-pointer w-64">
                <SvgPeoplePodLogo width={36} height={36} />
              </a>
            </Link>
          </div>
          <div
            className="ml-auto hover:cursor-pointer"
            onClick={handleHamburgerMenuClick}
          >
            <SvgMenu width={25} height={25} />
          </div>
        </div>
        {showDropdown && (
          <div className="mr-7">
            <Dropdown
              reverseIcons
              dropdownItems={generateDropdownItems()}
              showDropdown={showDropdown}
              handleDropdownItemClick={handleDropdownItemClick}
            />
          </div>
        )}
      </nav>
    </div>
  );
};

export default MobileNavbar;
