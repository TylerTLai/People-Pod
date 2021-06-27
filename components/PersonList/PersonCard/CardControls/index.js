import { FiEdit, FiHeart, FiTrash2 } from "react-icons/fi";
import Button from "../../../shared/Button";
import axiosInstance from "../../../../config/axios";
import { useDispatch, useSelector } from "react-redux";
import { setAllPeople } from "../../../../redux/slices/peopleSlice";
import { openModal, setFormData, setFormType } from "../../../../redux/slices/modalSlice";

const CardControls = ({ person }) => {
  const formType = useSelector((state) => state.modalReducer.formType);
  const dispatch = useDispatch();

  const { personId } = person;

  const handleFavorite = () => {
    console.log("favorite");
  };

  const handleEdit = () => {
    dispatch(openModal());
    dispatch(setFormData(person));
    dispatch(setFormType("edit"));
  };

  const handleDelete = async () => {
    const res = await axiosInstance.delete("people", {
      data: { personId },
    });

    const { deletedPerson, people } = res.data;
    dispatch(setAllPeople(people));
  };

  return (
    <div className="flex flex-wrap justify-between mt-4 ">
      <div>
        <Button onClick={handleFavorite} icon={<FiHeart />}>
          Favorite
        </Button>
      </div>
      <div className="mx-4">
        <Button onClick={handleEdit} icon={<FiEdit />}>
          Edit
        </Button>
      </div>
      <div className="ml-auto">
        <Button onClick={handleDelete} icon={<FiTrash2 />}>
          Delete
        </Button>
      </div>
    </div>
  );
};

export default CardControls;
