import { useSelector } from "react-redux";

const Layout = ({ children }) => {
  const expandView = useSelector((state) => state.viewReducer.expandView);
  return (
    <div
      className={`h-screen flex flex-col sm:grid ${
        expandView ? "sm:grid-cols-expand" : "sm:grid-cols-layout"
      }`}
    >
      {children}
    </div>
  );
};

export default Layout;
