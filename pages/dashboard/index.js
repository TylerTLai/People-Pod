import { useEffect } from "react";
import Head from "next/head";
import Layout from "../../components/Layout";
import DashboardNavbar from "../../components/Navbars/DashboardNavbar";
import Sidebar from "../../components/Sidebar";
import PeopleList from "../../components/PeopleList";
import PersonDetails from "../../components/PersonDetails";
import Modal from "../../components/shared/Modal";
import axiosInstance from "../../config/axios";
import { useDispatch } from "react-redux";
import { setAllPeople } from "../../redux/slices/peopleSlice";

const Dashboard = ({ data }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setAllPeople(data));
  }, []);

  return (
    <>
      <Modal />
      <DashboardNavbar />
      <Layout>
        <Sidebar />
        <PeopleList />
        <PersonDetails />
      </Layout>
    </>
  );
};

export async function getServerSideProps() {
  const response = await axiosInstance.get("people");
  let data = response.data;
  return {
    props: {
      data,
    },
  };
}

export default Dashboard;
