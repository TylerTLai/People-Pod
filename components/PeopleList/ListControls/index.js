import { FiUserPlus, FiFilter, FiAlignJustify, FiGrid } from "react-icons/fi";
import Button from "../../shared/Button";
import { useDispatch, useSelector } from "react-redux";
import { openModal, setFormType } from "../../../redux/slices/modalSlice";
import { setListView } from "../../../redux/slices/viewSlice";

const ListControls = () => {
  const dispatch = useDispatch();
  const listView = useSelector((state) => state.viewReducer.listView);

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
      <Button
        onClick={() => dispatch(setListView())}
        icon={listView ? <FiGrid /> : <FiAlignJustify />}
      >
        View
      </Button>
    </div>
  );
};

export default ListControls;
