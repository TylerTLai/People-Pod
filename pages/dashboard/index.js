import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useUser } from "@auth0/nextjs-auth0";
import { useRouter } from "next/router";
import axiosInstance from "../../config/axios";
import { setAllGroups } from "../../redux/slices/groupSlice";
import { setAllPeople } from "../../redux/slices/peopleSlice";
import Layout from "../../components/Layout";
import DashboardNavbar from "../../components/Navbars/DashboardNavbar";
import Sidebar from "../../components/Sidebar";
import PeopleList from "../../components/PeopleList";
import PersonDetails from "../../components/PersonDetails";
import Modal from "../../components/shared/Modal";
import axios from "axios";

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
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-center text-2xl uppercase font-bold">Loading...</p>
      </div>
    );
  if (error) return <div>{error.message}</div>;

  return (
    <>
      {user && (
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
