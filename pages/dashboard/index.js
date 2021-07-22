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
import { setAllGroups } from "../../redux/slices/groupSlice";
import axios from "axios";

const Dashboard = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [session] = useSession();

  useEffect(() => {
    
    const source = axios.CancelToken.source();

    const fetchPeople = async (userId, user) => {
      try {
        const res = await axiosInstance.get("people", {
          params: {
            userId,
            user,
          },
          cancelToken: source.token,
        });
        dispatch(setAllPeople(res.data));
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("axios request canceled");
        } else {
          console.error(error.message);
        }
      }
    };

    const fetchGroups = async (userId, user) => {
      try {
        const res = await axiosInstance.get("groups", {
          params: {
            userId,
            user,
          },
          cancelToken: source.token,
        });
        dispatch(setAllGroups(res.data));
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("axios request canceled");
        } else {
          console.error(error.message);
        }
      }
    };

    if (session === null) {
      router.push("/");
    } else {
      fetchPeople(session?.userId, session?.user);
      fetchGroups(session?.userId, session?.user);
    }

    return () => {
      source.cancel();
    };
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
