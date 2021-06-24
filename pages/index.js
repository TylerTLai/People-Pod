import { useState } from "react";
import Head from "next/head";
import Layout from "../components/Layout";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import PersonList from "../components/PersonList";
import PersonDetails from "../components/PersonDetails";
import Modal from "../components/shared/Modal";
import axiosInstance from "../config/axios";

export async function getServerSideProps() {
  const response = await axiosInstance.get("people");
  const data = response.data;
  return {
    props: {
      data,
    },
  };
}

export default function Home({ data }) {
  const [people, setPeople] = useState(data);

  return (
    <>
      <Modal setPeople={setPeople} people={people} />
      <Navbar />
      <Layout>
        <Sidebar />
        <PersonList people={people} />
        <PersonDetails />
      </Layout>
    </>
  );
}
