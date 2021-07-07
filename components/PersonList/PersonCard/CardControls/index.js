import { FiEdit, FiTrash2 } from "react-icons/fi";
import { AiOutlineHeart, AiFillHeart } from "react-icons/Ai";
import Button from "../../../shared/Button";
import axiosInstance from "../../../../config/axios";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { favoritePerson, setAllPeople } from "../../../../redux/slices/peopleSlice";
import { openModal, setFormData, setFormType } from "../../../../redux/slices/modalSlice";

const CardControls = ({ person }) => {
  const dispatch = useDispatch();

  const { personId } = person;

  const [localStatePerson, setLocalStatePerson] = useState(person);

  useEffect(() => {
    setLocalStatePerson(person);
  }, [person]);

  const handleFavorite = async () => {
    dispatch(favoritePerson({ personId, favorite: !person.favorite }));
    await axiosInstance.put("people", {
      ...person,
      favorite: !person.favorite,
    });
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

  console.log("person ", person);

  return (
    <div className="flex flex-wrap justify-between mt-4 ">
      <div>
        <Button
          onClick={handleFavorite}
          icon={
            localStatePerson.favorite ? (
              <AiFillHeart color="red" size="18" />
            ) : (
              <AiOutlineHeart size="18" />
            )
          }
        >
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
