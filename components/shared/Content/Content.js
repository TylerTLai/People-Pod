import SvgClipboard from "../Icons/Clipboard";
import SvgUser from "../Icons/User";
import SvgUsers from "../Icons/Users";

const Content = () => {
  return (
    <section className="text-gray-700 px-5 sm:px-10 md:px-20 lg:px-36 2xl:px-80">
      <div className="flex-col items-center my-5 sm:flex sm:flex-row">
        <div className="flex justify-center pt-5 sm:p-5 sm:rounded-full sm:bg-gray-100 sm:mr-5 md:mr-10">
          <SvgUser width={50} height={50} />
        </div>
        <div className="text-center py-5 mt-0 sm:text-left ">
          <h2 className="mb-4 text-3xl font-semibold text-black">Add People</h2>
          <p className="tracking-wide text-gray-500">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quibusdam odit rem
            tempora accusamus deserunt debitis magnam placeat ut amet dolorem.
          </p>
        </div>
      </div>
      <div className="flex-col items-center my-5 sm:flex sm:flex-row">
        <div className="flex justify-center pt-5 sm:p-5 sm:rounded-full sm:bg-gray-100 sm:mr-5 md:mr-10">
          <SvgClipboard width={50} height={50} />
        </div>
        <div className="text-center py-5 mt-0 sm:text-left ">
          <h2 className="mb-4 text-3xl font-semibold text-black">Add Notes</h2>
          <p className="tracking-wide text-gray-500">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quibusdam odit rem
            tempora accusamus deserunt debitis magnam placeat ut amet dolorem.
          </p>
        </div>
      </div>
      <div className="flex-col items-center my-5 sm:flex sm:flex-row">
        <div className="flex justify-center pt-5 sm:p-5 sm:rounded-full sm:bg-gray-100 sm:mr-5 md:mr-10">
          <SvgUsers width={50} height={50} />
        </div>
        <div className="text-center py-5 mt-0 sm:text-left ">
          <h2 className="mb-4 text-3xl font-semibold text-black">Add Groups</h2>
          <p className="tracking-wide text-gray-500">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quibusdam odit rem
            tempora accusamus deserunt debitis magnam placeat ut amet dolorem.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Content;
