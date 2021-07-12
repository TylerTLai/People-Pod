import SiteNavbar from "../components/Navbars/SiteNavbar";

const Home = () => {
  return (
    <div className="px-36">
      <SiteNavbar />

      <section className="text-center text-2xl text-gray-500 leading-normal py-24">
        <p className="text-center font-bold uppercase text-xl mb-4 text-green-300 tracking-widest">
          A modern personal CRM
        </p>

        <h1
          class="text-4xl lg:text-5xl font-bold
        text-gray-900 mb-10 text-center"
        >
          Remember the things that matter
          <br /> about the people who matter.
        </h1>
        <p>
          Bring all of your people into one place.
          <br />
          PeoplePod makes keeping in touch and
          <br />
          building stronger relationships easy.
        </p>
      </section>

      <div className="px-24">
        <section className="py-16 flex justify-between items-center">
          <div>
            <h1 className="text-left font-bold text-4xl text-red-600 uppercase tracking-wide mb-2">
              Manage
            </h1>
            <p className="text-left text-gray-500">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              <br /> Sunt mollitia, alias, veniam consequatur repellendus obcaecati
              <br /> vel quidem aspernatur ipsum quaerat officia perferendis
              <br /> voluptates a enim explicabo sed et asperiores molestias?
            </p>
          </div>
          <div>
            <img
              src="https://dummyimage.com/200x200/F3F4F7/8693ac"
              alt="placeholder"
              className={`rounded-md h-full w-full`}
            />
          </div>
        </section>

        <section className=" py-16 flex justify-between items-center">
          <div>
            <img
              src="https://dummyimage.com/200x200/F3F4F7/8693ac"
              alt="placeholder"
              className={`rounded-md h-full w-full`}
            />
          </div>
          <div>
            <h1 className="text-right font-bold text-4xl text-blue-500 uppercase tracking-wide mb-2">
              Organize
            </h1>
            <p className="text-right text-gray-500">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              <br /> Sunt mollitia, alias, veniam consequatur repellendus obcaecati
              <br /> vel quidem aspernatur ipsum quaerat officia perferendis
              <br /> voluptates a enim explicabo sed et asperiores molestias? lorem
            </p>
          </div>
        </section>

        <section className="py-16 flex justify-between items-center">
          <div>
            <h1 className="text-left font-bold text-4xl text-yellow-500 uppercase tracking-wide mb-2">
              Track
            </h1>
            <p className="text-left text-gray-500">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              <br /> Sunt mollitia, alias, veniam consequatur repellendus obcaecati
              <br /> vel quidem aspernatur ipsum quaerat officia perferendis
              <br /> voluptates a enim explicabo sed et asperiores molestias?
            </p>
          </div>
          <div>
            <img
              src="https://dummyimage.com/200x200/F3F4F7/8693ac"
              alt="placeholder"
              className={`rounded-md h-full w-full`}
            />
          </div>
        </section>
      </div>

      <div className="px-24">
        <section className="py-16 flex justify-between items-center">
          <div className="grid grid-cols-3 gap-y-40 gap-x-10">
            <div className="text-white bg-gray-900 rounded-md py-10 px-10 text-center">
              <h2 className="font-bold text-xl uppercase mb-2">Add people</h2>
              <p className="text-gray-300">
                Debitis velit iure non, excepturi quo maxime quos perspiciatis hic harum
                cum, reiciendis deserunt error esse ipsa.
              </p>
            </div>
            <div className="text-white bg-gray-900 rounded-md py-10 px-10 text-center">
              <h2 className="font-bold text-xl uppercase mb-2">Add notes</h2>
              <p className="text-gray-300">
                Debitis velit iure non, excepturi quo maxime quos perspiciatis hic harum
                cum, reiciendis deserunt error esse ipsa.
              </p>
            </div>
            <div className="text-white bg-gray-900 rounded-md py-10 px-10 text-center">
              <h2 className="font-bold text-xl uppercase mb-2">Create groups</h2>
              <p className="text-gray-300">
                Debitis velit iure non, excepturi quo maxime quos perspiciatis hic harum
                cum, reiciendis deserunt error esse ipsa.
              </p>
            </div>
          </div>
        </section>
      </div>
      <footer className="pt-44 pb-10 text-center text-sm text-gray-500 tracking-wide">
        Designed & built by Tyler Lai
      </footer>
    </div>
  );
};

export default Home;
