import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/client";
import { AiOutlineHeart, AiFillHeart } from "react-icons/Ai";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import axiosInstance from "../../../../config/axios";
import Button from "../../Button";
import {
  addOnePerson,
  favoritePerson,
  updateOnePerson,
} from "../../../../redux/slices/peopleSlice";
import { setFormType } from "../../../../redux/slices/modalSlice";
import { setPersonDefaults } from "./helper";

const _ = require("lodash");

const PersonForm = ({ handleModalClose }) => {
  const dispatch = useDispatch();
  const [session] = useSession();

  const formType = useSelector((state) => state.modalReducer.formType);
  const formData = useSelector((state) => state.modalReducer.formData);

  const [favorite, setFavorite] = useState(formData.favorite);

  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    setFavorite(formData.favorite);
  }, [formData, formData.favorite]);

  const handleFavoritePerson = async () => {
    // update person.favorite directly to be the opposite of favorite.
    setFavorite((prevState) => !prevState);
    dispatch(favoritePerson({ personId: formData.personId, favorite }));

    // const res = await axiosInstance.put("people", {
    //   ...formData,
    //   favorite: !favorite,
    // });

    // setFavorite(res.data.updatedPerson.favorite);
  };

  const onSubmit = async (data, e) => {
    if (formType === "editPerson") {
      const personDefaults = setPersonDefaults(data, formData);

      const updatedPerson = {
        ...formData,
        ...personDefaults,
      };

      if (!_.isEqual(formData, updatedPerson)) {
        try {
          handleModalClose();
          dispatch(updateOnePerson(updatedPerson));
          await axiosInstance.put("people", updatedPerson);
          reset();
          dispatch(setFormType("addPerson"));
        } catch (error) {
          console.error(error);
        }
      } else {
        handleModalClose();
      }
    } else {
      try {
        handleModalClose();
        const { userId, user } = session;
        const newPerson = {
          ...data,
          personId: uuidv4(),
          groups: [],
          favorite,
          userId,
          user,
        };
        dispatch(addOnePerson(newPerson));
        await axiosInstance.post("people", newPerson);
        reset();
        dispatch(setFormType("addPerson"));
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <>
      <form className="flex flex-col space-y-3 mb-5" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="firstName">First Name</label>
        <input
          className="border border-gray-200 rounded pl-4 py-1"
          id="firstName"
          name="firstName"
          type="text"
          placeholder={
            formType === "editPerson" && formData?.firstName
              ? formData.firstName
              : "First name..."
          }
          {...register("firstName")}
        />

        <label htmlFor="lastName">Last Name</label>
        <input
          className="border border-gray-200 rounded pl-4 py-1"
          id="lastName"
          name="lastName"
          type="text"
          placeholder={
            formType === "editPerson" && formData?.lastName
              ? formData.lastName
              : "Last name..."
          }
          {...register("lastName")}
        />
        <label htmlFor="quickNote">Quick Note</label>
        <textarea
          className="border border-gray-200 rounded pl-4 py-1"
          id="quickNote"
          name="quickNote"
          type="text"
          placeholder={
            formType === "editPerson" && formData?.quickNote
              ? formData.quickNote
              : "Quick note..."
          }
          {...register("quickNote")}
        />
        {favorite ? (
          <AiFillHeart color="red" size="18" onClick={handleFavoritePerson} />
        ) : (
          <AiOutlineHeart size="18" onClick={handleFavoritePerson} />
        )}
        <div>
          <Button primary type="submit">
            {formType === "editPerson" ? "Save Changes" : "Add Person"}
          </Button>
        </div>
      </form>
    </>
  );
};

export default PersonForm;