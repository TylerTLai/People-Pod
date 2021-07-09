import { useSelector } from "react-redux";

const Layout = ({ children }) => {
  const expandView = useSelector((state) => state.viewReducer.expandView);
  return (
    <div
      className={`h-screen flex flex-col sm:grid sm:grid-cols-${
        expandView ? "expand" : "layout"
      }`}
    >
      {children}
    </div>
  );
};

export default Layout;
