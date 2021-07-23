import { Menu, Transition } from "@headlessui/react";

const DropdownMenu = ({ menuItems, menuBtn, onMouseEnter, onMouseLeave }) => {
  const handleMenuClick = (event) => {
    console.log("from menu");
    onMouseLeave();
  };

  return (
    <Menu
      as="div"
      onMouseEnter={onMouseEnter}
      // onMouseLeave={onMouseLeave}
      className="relative inline-block text-left"
    >
      <Menu.Button className="py-0.5 focus:outline-none">{menuBtn}</Menu.Button>

      <Transition
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          as="ul"
          className="absolute right-0 w-40 mt-2 origin-top-right bg-white divide-y divide-gray-200 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
        >
          {menuItems.map((menuItem) => {
            const MenuIcon = menuItem.icon;

            return (
              <div className="px-1 py-1 ">
                <Menu.Item as="li">
                  {({ active }) => (
                    <button
                      onClick={handleMenuClick}
                      className={`${
                        active ? "bg-blue-500 text-white" : "text-gray-900"
                      } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                    >
                      <MenuIcon className="w-5 h-5 mr-2" aria-hidden="true" />
                      {menuItem.text}
                    </button>
                  )}
                </Menu.Item>
              </div>
            );
          })}
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default DropdownMenu;
