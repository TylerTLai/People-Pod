import { useUser } from "@auth0/nextjs-auth0";

import Link from "next/link";
import Button from "../../shared/Button";

const SiteNavbar = () => {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <nav className="py-5 flex items-center justify-content px-7">
      <div>
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
