const Dropdown = ({
  dropdownItems,
  className,
  showDropdown,
  handleDropdownItemClick,
  selectedGroup,
}) => {
  return (
    <div className="relative">
      {showDropdown && (
        <ul className="absolute right-0 w-40 mt-2 origin-top-right bg-white divide-y divide-gray-200 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          {dropdownItems.map((dropdownItem) => {
            const MenuIcon = dropdownItem.icon;

            return (
              <div className="px-1 py-1" key={dropdownItem.id}>
                <li className="text-gray-700">
                  <button
                    onClick={() =>
                      handleDropdownItemClick(selectedGroup, dropdownItem.text)
                    }
                    className="bg-white text-gray-700 hover:bg-blue-500 hover:text-white group flex rounded-md items-center w-full px-2 py-2 text-sm focus:outline-none"
                  >
                    <MenuIcon className="w-5 h-5 mr-2" aria-hidden="true" />
                    {dropdownItem.text}
                  </button>
                </li>
              </div>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
