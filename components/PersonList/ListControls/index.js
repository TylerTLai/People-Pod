import { FiUserPlus, FiFilter, FiAlignJustify } from "react-icons/fi";
import Button from "../../shared/Button";
import { useDispatch } from "react-redux";
import { openModal, setFormType } from "../../../redux/slices/modalSlice";

const ListControls = () => {
  const dispatch = useDispatch();

  const addPerson = () => {
    dispatch(setFormType("add"));
    dispatch(openModal());
  };

  return (
    <div className="flex items-center mt-6 justify-between">
      <Button primary icon={<FiUserPlus />} onClick={addPerson}>
        Add Person
      </Button>
      <div className="ml-auto mr-2">
        <Button icon={<FiFilter />}>Filter</Button>
      </div>
      <Button icon={<FiAlignJustify />}>Display</Button>
    </div>
  );
};

export default ListControls;
