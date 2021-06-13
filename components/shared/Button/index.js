const Button = ({ children, onClick, icon }) => {
  return (
    <button
      className="flex items-center justify-start text-gray-500 text-sm bg-white px-5 py-2 mt-2 font-medium transition duration-300 ease-in-out transform  rounded-md focus:shadow-outline hover:bg-gray-800 hover:text-white hover:border-gray-800 focus:outline-none"
      onClick={onClick}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
};

export default Button;
