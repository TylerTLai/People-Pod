import { useEffect } from "react";
import Head from "next/head";
import { useSession } from "next-auth/client";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import DashboardNavbar from "../../components/Navbars/DashboardNavbar";
import Sidebar from "../../components/Sidebar";
import PeopleList from "../../components/PeopleList";
import PersonDetails from "../../components/PersonDetails";
import Modal from "../../components/shared/Modal";
import axiosInstance from "../../config/axios";
import { useDispatch } from "react-redux";
import { setAllPeople } from "../../redux/slices/peopleSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [session] = useSession();

  useEffect(() => {
    const fetchData = async (userId, user) => {
      const res = await axiosInstance.get("people", {
        params: {
          userId,
          user,
        },
      });
      dispatch(setAllPeople(res.data));
    };

    session === null ? router.push("/") : fetchData(session?.userId, session?.user);
  }, [session]);

  return (
    <>
      {session && (
        <>
          <Modal />
          <DashboardNavbar />
          <Layout>
            <Sidebar />
            <PeopleList />
            <PersonDetails />
          </Layout>
        </>
      )}
    </>
  );
};

export default Dashboard;
