import SiteNavbar from "../components/Navbars/SiteNavbar";
import { useUser } from "@auth0/nextjs-auth0";
import Content from "../components/shared/Content/Content";
import Footer from "../components/shared/Footer/Footer";

const Home = () => {
  const { error, isLoading } = useUser();

  if (error) return <div>{error.message}</div>;

  return (
    <div className="px-36">
      {isLoading && (
        <div className="flex justify-center items-center min-h-screen">
          <p className="text-center text-2xl uppercase font-bold">One sec...</p>
        </div>
      )}

      {!isLoading && (
        <>
          <SiteNavbar />
          <section className="text-center text-2xl text-gray-500 leading-normal py-24">
            <p className="text-center font-bold uppercase text-xl mb-4 text-blue-500 tracking-widest">
              A modern personal CRM
            </p>

            <h1
              className="text-4xl lg:text-5xl font-bold
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

          <Content />
          <Footer />
        </>
      )}
    </div>
  );
};

export default Home;
