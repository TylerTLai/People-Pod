import { FiEdit, FiHeart, FiTrash2 } from "react-icons/fi";
import Button from "../../../shared/Button";
import axiosInstance from "../../../../config/axios";
import { useDispatch } from "react-redux";
import { setAllPeople } from "../../../../redux/slices/peopleSlice";

const CardControls = ({ person }) => {
  const dispatch = useDispatch();
  const { personId } = person;
  const handleFavorite = () => {
    console.log("favorite");
  };

  const handleEdit = () => {
    console.log("edit");
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
