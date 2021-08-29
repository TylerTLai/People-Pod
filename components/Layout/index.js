import { useSelector } from "react-redux";

const Layout = ({ children }) => {
  const expandView = useSelector((state) => state.viewReducer.expandView);
  return (
    <main
      className={`min-h-screen relative py-6 sm:py-0 grid-cols-mobile sm:grid ${
        expandView ? "sm:grid-cols-expand" : "sm:grid-cols-layout"
      }`}
    >
      {children}
    </main>
  );
};

export default Layout;
