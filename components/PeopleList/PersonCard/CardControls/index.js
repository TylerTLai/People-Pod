import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSession } from "next-auth/client";
import SvgEdit from "../../../shared/Icons/Edit";
import SvgHeart from "../../../shared/Icons/Heart";
import SvgTrash2 from "../../../shared/Icons/Trash2";
import Button from "../../../shared/Button";
import axiosInstance from "../../../../config/axios";
import {
  favoritePerson,
  setPersonId,
  setAllPeople,
  removeOnePerson,
} from "../../../../redux/slices/peopleSlice";
import { openModal, setFormData, setFormType } from "../../../../redux/slices/modalSlice";

const CardControls = ({ person }) => {
  const dispatch = useDispatch();
  const [session] = useSession();
  const { userId } = session;
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
    dispatch(removeOnePerson(personId));
    dispatch(setPersonId(null));
    try {
      await axiosInstance.delete("people", {
        data: { personId, userId },
      });
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
              <SvgHeart className="text-red-500 fill-current" />
            ) : (
              <SvgHeart />
            )
          }
        >
          Favorite
        </Button>
      </div>
      <div className="mx-4">
        <Button onClick={handleEditPerson} icon={<SvgEdit />}>
          Edit
        </Button>
      </div>
      <div className="ml-auto">
        <Button onClick={handleDeletePerson} icon={<SvgTrash2 />}>
          Delete
        </Button>
      </div>
    </div>
  );
};

export default CardControls;
