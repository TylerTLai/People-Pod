import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useUser } from "@auth0/nextjs-auth0";

import axiosInstance from "../../../../config/axios";
import { openModal, setFormData, setFormType } from "../../../../redux/slices/modalSlice";
import {
  favoritePerson,
  removeOnePerson,
  setAllPeople,
  setPersonId,
} from "../../../../redux/slices/peopleSlice";
import SvgEdit from "../../../shared/Icons/Edit";
import SvgHeart from "../../../shared/Icons/Heart";
import SvgTrash2 from "../../../shared/Icons/Trash2";
import Button from "../../../shared/Button";

const CardControls = ({ person }) => {
  const dispatch = useDispatch();
  const { user } = useUser();
  const userEmail = user.email;
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
        data: { personId, userEmail },
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
