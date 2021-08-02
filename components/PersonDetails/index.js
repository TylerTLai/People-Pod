import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import {
  FiMinimize2,
  FiMaximize2,
  FiMapPin,
  FiHome,
  FiClipboard,
  FiMail,
  FiSmartphone,
} from "react-icons/fi";
import { HiOutlineCake } from "react-icons/hi";
import IconButton from "../shared/IconButton";
import { setExpandView } from "../../redux/slices/viewSlice";
import axiosInstance from "../../config/axios";
import Summary from "./Summary";
import Section from "./Section";
import { createSectionData } from "./helper";
import { personDetailsVariants } from "./animation";

const PersonDetails = () => {
  const dispatch = useDispatch();
  const expandView = useSelector((state) => state.viewReducer.expandView);
  const personId = useSelector((state) => state.peopleReducer.personId);
  const people = useSelector((state) => state.peopleReducer.people);
  const [person, setPerson] = useState({});
  // const [sectionData, setSectionDatat] = useState({});

  useEffect(() => {
    const getPerson = async () => {
      try {
        const res = await axiosInstance.get("people", {
          params: {
            personId,
          },
        });
        setPerson(res.data);
        // setSectionData(createSectionData(res.data));
      } catch (error) {
        console.error("error message: ", error.message);
      }
    };

    getPerson();
  }, [personId, people]);

  const handlePersonDetailsExpand = () => {
    dispatch(setExpandView());
  };

  const sectionData = {
    title: "About",
    details: [
      {
        id: 1,
        value:
          "Lorem, ipsum dolor sit amet consectetur adipisicing, iure voluptate perferendis tempora!",
        icon: FiClipboard,
      },
      {
        id: 2,
        value: "Birthday",
        icon: HiOutlineCake,
      },
      {
        id: 3,
        value: "Location",
        icon: FiMapPin,
      },
      {
        id: 4,
        value: "Address",
        icon: FiHome,
      },
      {
        id: 5,
        value: "Phone Number",
        icon: FiSmartphone,
      },
      {
        id: 6,
        value: "Email",
        icon: FiMail,
      },
    ],
  };

  return (
    <>
      {personId ? (
        <motion.div
          variants={personDetailsVariants}
          initial="initial"
          animate="show"
          className="max-h-full border-l border-gray-200 py-7 px-5 overflow-y-auto"
        >
          <div className="flex mt-1 mb-5">
            <div>
              <IconButton
                onClick={handlePersonDetailsExpand}
                icon={expandView ? <FiMinimize2 size={20} /> : <FiMaximize2 size={20} />}
              />
            </div>
          </div>
          <Summary person={person} />
          <Section sectionData={sectionData} />
        </motion.div>
      ) : (
        <div className="flex items-center justify-center value-xl uppercase font-bold ">
          People Pod
        </div>
      )}
    </>
  );
};

export default PersonDetails;
