import { useState, useEffect } from "react";
import Head from "next/head";
import Layout from "../components/Layout";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import PeopleList from "../components/PeopleList";
import PersonDetails from "../components/PersonDetails";
import Modal from "../components/shared/Modal";
import axiosInstance from "../config/axios";
import { useDispatch, useSelector } from "react-redux";
import { setAllPeople } from "../redux/slices/peopleSlice";

const Home = ({ data }) => {
  const dispatch = useDispatch();
  const people = useSelector((state) => state.peopleReducer.people);

  useEffect(() => {
    dispatch(setAllPeople(data));
  }, []);

  return (
    <>
      <Modal />
      <Navbar />
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

export default Home;
