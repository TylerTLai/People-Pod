import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FiMinimize2,
  FiMaximize2,
  FiMapPin,
  FiHome,
  FiClipboard,
  FiMail,
  FiSmartphone,
  FiTrash2,
  FiEdit,
} from "react-icons/fi";
import { HiOutlineCake } from "react-icons/hi";
import IconButton from "../shared/IconButton";
import { setExpandView } from "../../redux/slices/viewSlice";
import axiosInstance from "../../config/axios";
import Summary from "./Summary";
import Section from "./Section";
import { AiFillHeart, AiOutlineHeart } from "react-icons/Ai";
import { createSectionData } from "./helper";

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
        value:
          "Lorem, ipsum dolor sit amet consectetur adipisicing, iure voluptate perferendis tempora!",
        icon: FiClipboard,
      },
      {
        value: "Birthday",
        icon: HiOutlineCake,
      },
      {
        value: "Location",
        icon: FiMapPin,
      },
      {
        value: "Address",
        icon: FiHome,
      },
      {
        value: "Phone Number",
        icon: FiSmartphone,
      },
      {
        value: "Email",
        icon: FiMail,
      },
    ],
  };

  return (
    <>
      {personId ? (
        <div className="max-h-full border-l border-gray-200 py-7 px-5 overflow-y-auto">
          <div className="flex mt-1 mb-5">
            <div>
              <IconButton
                onClick={handlePersonDetailsExpand}
                icon={expandView ? <FiMinimize2 size={20} /> : <FiMaximize2 size={20} />}
              />
            </div>
            <div className="ml-auto space-x-5">
              <IconButton
                onClick={handlePersonDetailsExpand}
                icon={
                  expandView ? <AiOutlineHeart size={20} /> : <AiFillHeart size={20} />
                }
              />
              <IconButton
                onClick={handlePersonDetailsExpand}
                icon={<FiEdit size={20} />}
              />
              <IconButton
                onClick={handlePersonDetailsExpand}
                icon={<FiTrash2 size={20} />}
              />
            </div>
          </div>
          <Summary person={person} />
          <Section sectionData={sectionData} />
        </div>
      ) : (
        <div className="flex items-center justify-center value-xl uppercase font-bold ">
          People Pod
        </div>
      )}
    </>
  );
};

export default PersonDetails;
