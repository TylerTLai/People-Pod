import Link from "next/link";
import Button from "../components/shared/Button";

const Home = () => {
  return (
    <>
      <div>
        <Link href="/dashboard">
          <Button>Dashboard</Button>
        </Link>
      </div>
    </>
  );
};

export default Home;
