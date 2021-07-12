import Link from "next/link";
import Button from "../../../components/shared/Button";

const SiteNavbar = () => {
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
          <Link href="/dashboard">
            <a>
              <li>
                <Button secondary>Dashboard</Button>
              </li>
            </a>
          </Link>
          <Link href="/signin">
            <a>
              <li>
                <Button primary>Sign in</Button>
              </li>
            </a>
          </Link>
        </ul>
      </div>
    </nav>
  );
};

export default SiteNavbar;
