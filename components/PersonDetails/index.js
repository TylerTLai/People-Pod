import { useUser } from "@auth0/nextjs-auth0";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../../config/axios";
import { setExpandView } from "../../redux/slices/viewSlice";
import IconButton from "../shared/IconButton";
import SvgMaximize2 from "../shared/Icons/Maximize2";
import SvgMinimize2 from "../shared/Icons/Minimize2";
import { personDetailsVariants } from "./animation";
import { createSectionData } from "./helper";
import Section from "./Section";
import Summary from "./Summary";

const PersonDetails = () => {
  const dispatch = useDispatch();
  const { user } = useUser();
  const userEmail = user?.email;
  const expandView = useSelector((state) => state.viewReducer.expandView);
  const personId = useSelector((state) => state.peopleReducer.personId);
  const people = useSelector((state) => state.peopleReducer.people);
  const [person, setPerson] = useState({});

  useEffect(() => {
    const getPerson = async () => {
      try {
        const res = await axiosInstance.get("people", {
          params: {
            personId,
            userEmail,
          },
        });
        setPerson(res.data);
        // createSectionData(res.data);
      } catch (error) {
        console.error("error message: ", error.message);
      }
    };

    getPerson();
  }, [personId, people]);

  const handlePersonDetailsExpand = () => {
    dispatch(setExpandView());
  };

  // const sectionData = {
  //   title: "About",
  //   details: [
  //     {
  //       id: 1,
  //       value: person.quickNote ? person.quickNote : "No notes provided.",
  //       icon: SvgClipboard,
  //     },
  //     {
  //       id: 2,
  //       value: person.birthday ? person.birthday : "No birthday provided.",
  //       icon: SvgCake,
  //     },
  //     {
  //       id: 3,
  //       value: person.location ? person.location : "No location provided",
  //       icon: SvgMapPin,
  //     },
  //     {
  //       id: 4,
  //       value: person.address ? person.address : "No address provided",
  //       icon: SvgHome,
  //     },
  //     {
  //       id: 5,
  //       value: person.phoneNumber ? person.phoneNumber : "No phone number provided",
  //       icon: SvgSmartphone,
  //     },
  //     {
  //       id: 6,
  //       value: person.email ? person.email : "No email provided",
  //       icon: SvgMail,
  //     },
  //   ],
  // };

  return (
    <div className={`flex-1`}>
      {personId ? (
        <motion.div
          variants={personDetailsVariants}
          initial="initial"
          animate="show"
          className="max-h-full px-5 overflow-y-auto border-l border-gray-200 py-7"
        >
          <div className="flex mt-1 mb-5">
            <div>
              <IconButton
                onClick={handlePersonDetailsExpand}
                icon={expandView ? <SvgMinimize2 /> : <SvgMaximize2 />}
              />
            </div>
          </div>
          <Summary person={person} />
          <Section sectionData={createSectionData(person)} />
        </motion.div>
      ) : (
        <div className="flex items-center justify-center min-h-screen text-xl font-bold uppercase">
          People Pod
        </div>
      )}
    </div>
  );
};

export default PersonDetails;
