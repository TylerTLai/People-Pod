import Head from "next/head";
import { useState } from "react";
import Layout from "../components/Layout";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import PersonList from "../components/PersonList";
import PersonDetails from "../components/PersonDetails";
import Modal from "../components/shared/Modal";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default function Home({ people }) {
  const [localPeople, setLocalPeople] = useState(people);

  return (
    <>
      <Modal />
      <Navbar />
      <Layout>
        <Sidebar />
        <PersonList people={localPeople} />
        <PersonDetails />
      </Layout>
    </>
  );
}

export async function getServerSideProps() {
  const people = await prisma.person.findMany();
  return {
    props: {
      people,
    },
  };
}
