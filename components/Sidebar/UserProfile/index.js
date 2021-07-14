const UserProfile = () => {
  return (
    <div className={`flex items-center rounded-lg hover:cursor-pointer`}>
      <img
        src="https://dummyimage.com/302x302/F3F4F7/8693ac"
        alt="user name"
        className={`object-cover w-10 h-10 rounded-full`}
      />
      <div>
        <h2 className="text-sm font-medium tracking-widest text-gray-800 uppercase title-font ml-5">
          Rick Morty
        </h2>
      </div>
    </div>
  );
};

export default UserProfile;
