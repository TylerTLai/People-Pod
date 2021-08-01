import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import PersonPic from "./PersonPic";
import PersonBio from "./PersonBio";
import CardControls from "./CardControls";
import { setPersonId } from "../../../redux/slices/peopleSlice";
import { personCardVariants } from "./animation";

const PersonCard = ({ person }) => {
  const dispatch = useDispatch();
  const listView = useSelector((state) => state.viewReducer.listView);

  const { personId } = person;

  const handleLoadPersonDetails = () => {
    dispatch(setPersonId(personId));
  };

  return (
    <>
      {listView ? (
        <motion.div
          variants={personCardVariants}
          initial="initial"
          animate="show"
          onClick={handleLoadPersonDetails}
          className="flex flex-col bg-white border-2 border-white rounded-lg p-5 mt-9 hover:border-gray-300 hover:cursor-pointer transition duration-300 ease-in-out"
        >
          <div className="flex space-x-4">
            <PersonPic person={person} />
            <PersonBio person={person} />
          </div>
          <CardControls person={person} />
        </motion.div>
      ) : (
        <motion.div
          variants={personCardVariants}
          initial="initial"
          animate="show"
          onClick={handleLoadPersonDetails}
          className="border-2 hover:border-gray-300 transition duration-300 ease-in-out hover:cursor-pointer rounded-lg mt-9 bg-white"
        >
          <div className="flex flex-col items-center px-3 py-3">
            <PersonPic person={person} />
            <p className="mt-5 text-center font-semibold tracking-wider uppercase title-font text-gray-800">
              {person.firstName} {person.lastName}
            </p>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default PersonCard;
