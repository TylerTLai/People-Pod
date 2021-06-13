import Head from "next/head";
import Layout from "../components/Layout";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import PersonList from "../components/PersonList";
import PersonDetails from "../components/PersonDetails";
import Modal from "../components/shared/Modal";

export default function Home() {
  return (
    <>
      <Modal />
      <Navbar />
      <Layout>
        <Sidebar />
        <PersonList />
        <PersonDetails />
      </Layout>
    </>
  );
}
