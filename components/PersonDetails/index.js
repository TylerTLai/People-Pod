import Summary from "./Summary";
import About from "./About";
import Contacts from "./Contacts";
import SocialMedia from "./SocialMedia";
import { CgArrowsExpandLeft } from "react-icons/cg";
import { FiMaximize2 } from "react-icons/fi";
import Button from "../shared/Button";
import { useDispatch, useSelector } from "react-redux";
import { setExpandView } from "../../redux/slices/viewSlice";

const PersonDetails = () => {
  const dispatch = useDispatch();
  const expandView = useSelector((state) => state.viewReducer.expandView);

  const handleExpand = () => {
    dispatch(setExpandView());
  };

  return (
    <div className="max-h-full border-l border-gray-200 py-7 px-5 overflow-y-auto">
      <Button
        onClick={handleExpand}
        icon={expandView ? <FiMaximize2 size={15} /> : <CgArrowsExpandLeft size={15} />}
      />
      <Summary />
      <About />
      <Contacts />
      <SocialMedia />
    </div>
  );
};

export default PersonDetails;
