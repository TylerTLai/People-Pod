const Section = ({ sectionData }) => {
  return (
    <div className="border border-gray-300 rounded-xl my-5 w-full p-5">
      <h3 className="text-2xl mb-3">{sectionData.title}</h3>
      <ul className="flex flex-col space-y-4">
        {sectionData.details.map((detail) => {
          const SectionIcon = detail.icon;
          return (
            <>
              <li className="flex">
                <SectionIcon className="mt-3" />
                <div className="flex space-x-5 flex-1">
                  <div className="text-gray-500 ml-5 flex-1 flex">
                    <div className="relative w-full flex item-center mr-2">
                      <p className="mr-2 bg-white rounded-md px-4 py-2 w-full text-sm outline-none">
                        {detail.value}
                      </p>
                    </div>
                  </div>
                </div>
              </li>
            </>
          );
        })}
      </ul>
    </div>
  );
};

export default Section;
