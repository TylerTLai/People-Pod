import { useSelector } from "react-redux";

const Layout = ({ children }) => {
  const expandView = useSelector((state) => state.viewReducer.expandView);
  return (
    <main
      className={`h-screen flex flex-col sm:grid ${
        expandView ? "sm:grid-cols-expand" : "sm:grid-cols-layout"
      }`}
    >
      {children}
    </main>
  );
};

export default Layout;
