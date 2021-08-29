import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0";

import Button from "../../shared/Button";
import SvgPeoplePodLogo from "../../shared/Icons/PeoplePodLogo";

const SiteNavbar = () => {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <nav className="py-3 flex items-center justify-content bg-white border-b-2 border-gray-100 px-5 sm:px-10 md:px-20 lg:px-36 2xl:px-80">
      <div className="flex items-center space-x-3">
        <SvgPeoplePodLogo width={36} height={36} />
        <Link href="/">
          <a className="text-xl uppercase font-bold cursor-pointer w-64">People Pod</a>
        </Link>
      </div>
      <div className="ml-auto">
        <ul className="flex items-center justify-center space-x-4">
          {user && (
            <li>
              <Link href="/dashboard">
                <a>
                  <Button secondary>Dashboard</Button>
                </a>
              </Link>
            </li>
          )}

          <li>
            <Button primary>
              {user ? (
                <Link href="/api/auth/logout">
                  <a>Log out</a>
                </Link>
              ) : (
                <Link href="/api/auth/login">
                  <a>Log in</a>
                </Link>
              )}
            </Button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default SiteNavbar;
