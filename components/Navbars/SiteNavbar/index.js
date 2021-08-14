import { useUser } from "@auth0/nextjs-auth0";

import Link from "next/link";
import Button from "../../../components/shared/Button";

const SiteNavbar = () => {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <nav className="py-5 flex items-center">
      <div className="">
        <Link href="/">
          <a className="sm:inline text-xl uppercase font-bold cursor-pointer w-64">
            People Pod
          </a>
        </Link>
      </div>
      <div className="ml-auto">
        <ul className="flex items-center space-x-4">
          {user && (
            <Link href="/dashboard">
              <a>
                <li>
                  <Button secondary>Dashboard</Button>
                </li>
              </a>
            </Link>
          )}

          <a>
            <li>
              <Button primary>
                {user ? (
                  <a href="/api/auth/logout">Log out</a>
                ) : (
                  <a href="/api/auth/login">Log in</a>
                )}
              </Button>
            </li>
          </a>
        </ul>
      </div>
    </nav>
  );
};

export default SiteNavbar;
