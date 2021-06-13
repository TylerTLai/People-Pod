const Button = ({ children, icon, onClick, primary, type }) => {
  const btnColor = primary ? "bg-gray-600" : "bg-white";
  const btnTextColor = primary ? "text-white" : "text-gray-500";

  return (
    <button
      className={`flex items-center justify-start ${btnTextColor} text-sm ${btnColor} px-5 py-2 mt-2 font-medium transition duration-300 ease-in-out transform  rounded-md focus:shadow-outline hover:bg-gray-800 hover:text-white hover:border-gray-800 focus:outline-none`}
      onClick={onClick}
      type={type}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
};

export default Button;
