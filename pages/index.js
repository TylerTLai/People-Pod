import { useUser } from "@auth0/nextjs-auth0";

import Content from "../components/shared/Content/Content";
import Footer from "../components/shared/Footer/Footer";
import Hero from "../components/shared/Hero/Hero";
import Navbar from "../components/Navbar";

const Home = () => {
  const { error, isLoading } = useUser();

  if (error) return <div>{error.message}</div>;

  return (
    <>
      {isLoading && (
        <div className="flex justify-center items-center min-h-screen">
          <p className="text-center text-2xl uppercase font-bold">Loading...</p>
        </div>
      )}

      {!isLoading && (
        <>
          <Navbar />
          <div className="pt-5 pb-20 sm:pb-36 lg:pb-52 2xl:pb-60">
            <Hero />
            <Content />
          </div>
          <Footer />
        </>
      )}
    </>
  );
};

export default Home;
