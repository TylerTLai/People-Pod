import SvgSearch from "../../../shared/Icons/Search";

const SearchInput = ({ handleInputChange }) => {
  return (
    <div className="relative w-5/12">
      <SvgSearch className="absolute top-3.5 left-4 text-gray-400" />
      <input
        className="min-w-full px-10 py-2 placeholder-gray-500 transition duration-300 ease-in-out border-2 border-gray-200 rounded-full hover:border-gray-400 focus:outline-none"
        type="text"
        placeholder="Find a person..."
        onChange={handleInputChange}
      />
    </div>
  );
};

export default SearchInput;
