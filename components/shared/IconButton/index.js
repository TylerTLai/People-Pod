const IconButton = ({ children, icon, onClick, dark, type, className }) => {
  const btnColor = dark ? "bg-gray-800" : "bg-gray-100";

  return (
    <button
      className={`${className} w-min ${btnColor} ${
        !dark && "p-3 py-2"
      } transition duration-300 ease-in-out transform rounded-md focus:shadow-outline hover:${
        !dark && "bg-gray-800"
      } hover:text-white focus:outline-none`}
      onClick={onClick}
      type={type}
    >
      {icon && <>{icon}</>}
      {children}
    </button>
  );
};

export default IconButton;
