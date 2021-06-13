const PersonBio = () => {
  return (
    <div className="flex flex-col text-gray-800">
      <h2 className="mb-1 text-2xl font-semibold tracking-wider uppercase title-font text-gray-800">
        John Smith
      </h2>
      <p className="mb-1 text-sm text-gray-400 tracking-wider">Los Angeles, California</p>
      <p className="break-words mb-3 text-base leading-relaxed">
        Millionare, playboy, genius, philantropist.
      </p>
    </div>
  );
};

export default PersonBio;
