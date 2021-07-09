const UserProfile = ({ showSidebar }) => {
  return (
    <div
      className={`flex items-center w-full p-4 rounded-lg ${!showSidebar && "hidden"} hover:cursor-pointer`}
    >
      <img
        src="https://dummyimage.com/302x302/F3F4F7/8693ac"
        alt="user name"
        className={`object-cover w-10 h-10 ${showSidebar && "mr-4"} rounded-full`}
      />
      <div className={`${!showSidebar && "hidden"}`}>
        <h2 className="text-sm font-medium tracking-widest text-white uppercase title-font">
          John Doe
        </h2>
        <p className="text-white">Admin</p>
      </div>
    </div>
  );
};

export default UserProfile;
