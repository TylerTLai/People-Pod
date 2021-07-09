import { useRouter } from "next/router";
import { useEffect } from "react";
import PersonCard from "../../components/PersonList/PersonCard";
import axiosInstance from "../../config/axios";

const Person = () => {
  const router = useRouter();
  const { personId } = router.query;

  useEffect(() => {
    const res = axiosInstance.get("people", {
      params: {
        personId,
      },
    });

    console.log(res);
  }, [personId]);

  return (
    <>
      {/* <PersonCard /> */}
      person
    </>
  );
};

export default Person;
