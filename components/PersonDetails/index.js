import Summary from "./Summary";
import About from "./About";
import Contacts from "./Contacts";
import SocialMedia from "./SocialMedia";
import { CgArrowsExpandLeft } from "react-icons/cg";
import { FiMaximize2 } from "react-icons/fi";
import IconButton from "../shared/IconButton";
import { useDispatch, useSelector } from "react-redux";
import { setExpandView } from "../../redux/slices/viewSlice";
import { useEffect, useState } from "react";
import axiosInstance from "../../config/axios";

const PersonDetails = () => {
  const dispatch = useDispatch();
  const expandView = useSelector((state) => state.viewReducer.expandView);
  const personId = useSelector((state) => state.peopleReducer.personId);
  const people = useSelector((state) => state.peopleReducer.people);
  const [person, setPerson] = useState({});

  useEffect(() => {
    const getPerson = async () => {
      const res = await axiosInstance.get("people", {
        params: {
          personId,
        },
      });
      setPerson(res.data);
    };

    getPerson();
  }, [personId, people]);

  const handleExpand = () => {
    dispatch(setExpandView());
  };

  console.log("what si person id ", personId);

  return (
    <>
      {personId ? (
        <div className="max-h-full border-l border-gray-200 py-7 px-5 overflow-y-auto">
          <IconButton
            onClick={handleExpand}
            icon={
              expandView ? <FiMaximize2 size={16} /> : <CgArrowsExpandLeft size={16} />
            }
          />
          <Summary person={person} />
          <About person={person} />
          <Contacts person={person} />
          <SocialMedia person={person} />
        </div>
      ) : (
        <div className="flex items-center justify-center text-xl uppercase font-bold ">
          People Pod
        </div>
      )}
    </>
  );
};

export default PersonDetails;
