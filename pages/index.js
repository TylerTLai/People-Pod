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
          <p className="text-center text-2xl uppercase font-bold">One sec...</p>
        </div>
      )}

      {!isLoading && (
        <>
          <Navbar />
          <Hero />
          <Content />
          <Footer />
        </>
      )}
    </>
  );
};

export default Home;
