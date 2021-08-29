const Layout = ({ children }) => {
  return (
    <main className={`relative top-6 sm:top-0 sm:max-h-screen sm:flex`}>{children}</main>
  );
};

export default Layout;
