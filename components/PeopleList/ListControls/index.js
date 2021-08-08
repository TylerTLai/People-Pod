import Button from "../../shared/Button";
import { useDispatch, useSelector } from "react-redux";
import { openModal, setFormType } from "../../../redux/slices/modalSlice";
import { setListView } from "../../../redux/slices/viewSlice";
import SvgAlignJustify from "../../shared/Icons/AlignJustify";
import SvgFilter from "../../shared/Icons/Filter";
import SvgGrid from "../../shared/Icons/Grid";
import SvgUserPlus from "../../shared/Icons/UserPlus";

const ListControls = () => {
  const dispatch = useDispatch();
  const listView = useSelector((state) => state.viewReducer.listView);

  const handleAddPerson = () => {
    dispatch(setFormType("addPerson"));
    dispatch(openModal());
  };

  return (
    <div className="flex items-center mt-6 justify-between">
      <Button primary icon={<SvgUserPlus />} onClick={handleAddPerson}>
        Add Person
      </Button>
      {/* <div className="ml-auto mr-2">
        <Button icon={<SvgFilter />}>Filter</Button>
      </div> */}
      <Button
        onClick={() => dispatch(setListView())}
        icon={listView ? <SvgGrid /> : <SvgAlignJustify />}
      >
        View
      </Button>
    </div>
  );
};

export default ListControls;
