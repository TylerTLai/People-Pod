import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useUser } from "@auth0/nextjs-auth0";
import { useRouter } from "next/router";

import axiosInstance from "../../config/axios";
import { setAllGroups } from "../../redux/slices/groupSlice";
import { setAllPeople } from "../../redux/slices/peopleSlice";

import Layout from "../../components/Layout";
import Modal from "../../components/shared/Modal";
import Navbar from "../../components/Navbar";
import PeopleList from "../../components/PeopleList";
import PersonDetails from "../../components/PersonDetails";
import Sidebar from "../../components/Sidebar";

const Dashboard = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { user, error, isLoading } = useUser();
  const userEmail = user?.email;

  useEffect(() => {
    const source = axios.CancelToken.source();
    const fetchPeople = async (userEmail) => {
      try {
        const res = await axiosInstance.get("people", {
          params: {
            userEmail,
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

    const fetchGroups = async (userEmail) => {
      try {
        const res = await axiosInstance.get("groups", {
          params: {
            userEmail,
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

    if (user === null) {
      router.push("/");
    } else {
      fetchPeople(userEmail);
      fetchGroups(userEmail);
    }

    return () => {
      source.cancel();
    };
  }, [user]);

  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-2xl font-bold text-center uppercase">Loading...</p>
      </div>
    );
  if (error) return <div>{error.message}</div>;

  return (
    <>
      {user && (
        <>
          <Modal />
          {/* <DashboardNavbar /> */}
          <Navbar />
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
