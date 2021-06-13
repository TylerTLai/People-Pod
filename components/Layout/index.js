const Layout = ({ children }) => {
  return (
    <div className="h-screen sm:grid flex flex-col sm:grid-cols-layout">{children}</div>
  );
};

export default Layout;
