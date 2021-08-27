import { useRouter } from "next/router";
import SiteNavbar from "./SiteNavbar";
import DashboardNavbar from "./DashboardNavbar";
import MobileNavbar from "./shared/MobileNavbar";

const Navbar = () => {
  const router = useRouter();

  if (router.route === "/")
    return (
      <>
        <div className="hidden sm:block">
          <SiteNavbar />
        </div>
        <div className="sm:hidden">
          <MobileNavbar />
        </div>
      </>
    );
  if (router.route === "/dashboard")
    return (
      <>
        <div className="sm:hidden">
          <MobileNavbar />
        </div>
        <div className="hidden sm:block">
          <DashboardNavbar />
        </div>
      </>
    );
};

export default Navbar;
