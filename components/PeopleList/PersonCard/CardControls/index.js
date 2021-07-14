import { FiEdit, FiTrash2 } from "react-icons/fi";
import { AiOutlineHeart, AiFillHeart } from "react-icons/Ai";
import Button from "../../../shared/Button";
import axiosInstance from "../../../../config/axios";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import {
  favoritePerson,
  setPersonId,
  setAllPeople,
} from "../../../../redux/slices/peopleSlice";
import { openModal, setFormData, setFormType } from "../../../../redux/slices/modalSlice";

const CardControls = ({ person }) => {
  const dispatch = useDispatch();

  const { personId } = person;

  const [localStatePerson, setLocalStatePerson] = useState(person);

  useEffect(() => {
    setLocalStatePerson(person);
  }, [person]);

  const handleFavoritePerson = async () => {
    dispatch(favoritePerson({ personId, favorite: !person.favorite }));
    try {
      await axiosInstance.put("people", {
        ...person,
        favorite: !person.favorite,
      });
    } catch (error) {
      console.error("error message: ", error.message);
    }
  };

  const handleEditPerson = () => {
    dispatch(setFormType("editPerson"));
    dispatch(setFormData(person));
    dispatch(openModal());
  };

  const handleDeletePerson = async () => {
    try {
      const res = await axiosInstance.delete("people", {
        data: { personId },
      });

      const { deletedPerson, people } = res.data;
      dispatch(setAllPeople(people));
      dispatch(setPersonId(null));
    } catch (error) {
      console.error("error message: ", error.message);
    }
  };

  return (
    <div className="flex flex-wrap justify-between mt-4 ">
      <div>
        <Button
          onClick={handleFavoritePerson}
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
        <Button onClick={handleEditPerson} icon={<FiEdit />}>
          Edit
        </Button>
      </div>
      <div className="ml-auto">
        <Button onClick={handleDeletePerson} icon={<FiTrash2 />}>
          Delete
        </Button>
      </div>
    </div>
  );
};

export default CardControls;
