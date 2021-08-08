import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import SvgCake from "../shared/Icons/Cake";
import SvgClipboard from "../shared/Icons/Clipboard";
import SvgHome from "../shared/Icons/Home";
import SvgMail from "../shared/Icons/Mail";
import SvgMapPin from "../shared/Icons/MapPin";
import SvgMaximize2 from "../shared/Icons/Maximize2";
import SvgMinimize2 from "../shared/Icons/Minimize2";
import SvgSmartphone from "../shared/Icons/Smartphone";
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
        icon: SvgClipboard,
      },
      {
        id: 2,
        value: "Birthday",
        icon: SvgCake,
      },
      {
        id: 3,
        value: "Location",
        icon: SvgMapPin,
      },
      {
        id: 4,
        value: "Address",
        icon: SvgHome,
      },
      {
        id: 5,
        value: "Phone Number",
        icon: SvgSmartphone,
      },
      {
        id: 6,
        value: "Email",
        icon: SvgMail,
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
                icon={expandView ? <SvgMinimize2 /> : <SvgMaximize2 />}
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
