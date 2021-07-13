import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/client";
import Button from "../../../components/shared/Button";

const SiteNavbar = () => {
  const [session] = useSession();

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
          {session && (
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
              <Button
                primary
                onClick={() =>
                  session
                    ? signOut()
                    : signIn("auth0", { callbackUrl: "http://localhost:3000/dashboard" })
                }
              >
                {session ? "Sign Out" : "Sign In"}
              </Button>
            </li>
          </a>
        </ul>
      </div>
    </nav>
  );
};

export default SiteNavbar;
