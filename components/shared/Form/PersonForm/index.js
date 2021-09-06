import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useUser } from "@auth0/nextjs-auth0";
import { useDispatch, useSelector } from "react-redux";
import AsyncCreatableSelect from "react-select/async-creatable";
import { v4 as uuidv4 } from "uuid";
import axiosInstance from "../../../../config/axios";
import Button from "../../Button";
import SvgHeart from "../../Icons/Heart";
import {
  addOnePerson,
  favoritePerson,
  updateOnePerson,
} from "../../../../redux/slices/peopleSlice";
import { setFormType } from "../../../../redux/slices/modalSlice";
import { convertToCamelize, formatFormGroups, setPersonPrefilledValues } from "./helper";
import { addGroup } from "../../../../redux/slices/groupSlice";

const _ = require("lodash");

const PersonForm = ({ handleModalClose }) => {
  const dispatch = useDispatch();
  const { user } = useUser();
  const userEmail = user.email;

  const formType = useSelector((state) => state.modalReducer.formType);
  const formData = useSelector((state) => state.modalReducer.formData);

  const [favorite, setFavorite] = useState(formData.favorite);
  const [formGroups, setFormGroups] = useState([]);
  const { personId } = formData;

  const { register, handleSubmit, reset } = useForm();

  const getGroupOptions = async () => {
    const res = await axiosInstance.get("groups", {
      params: {
        userEmail,
      },
    });

    const groupList = res.data;

    const groupOptions = groupList.map((group) => ({
      label: group.name,
      value: group.value,
      groupId: group.groupId,
    }));

    return groupOptions;
  };

  useEffect(() => {
    setFavorite(formData.favorite);
  }, [formData, formData.favorite]);

  const handleFavoritePerson = async () => {
    // update person.favorite directly to be the opposite of favorite.
    setFavorite((prevState) => !prevState);
    dispatch(favoritePerson({ personId, favorite }));

    // const res = await axiosInstance.put("people", {
    //   ...formData,
    //   favorite: !favorite,
    // });

    // setFavorite(res.data.updatedPerson.favorite);
  };

  const handleGroupChange = (inputGroup) => {
    inputGroup.forEach((group) => {
      group.value = convertToCamelize(group.value);
    });
    setFormGroups(inputGroup && inputGroup);
  };

  const onSubmit = async (data) => {
    if (formType === "editPerson") {
      // prefill the form with the previous values
      const personPrefilledValues = setPersonPrefilledValues(data, formData);

      // format group form data to match group schema
      const formatedGroups = formatFormGroups(formGroups, userEmail);
      const newGroups = formatedGroups.filter((group) => group.isNew);

      // update the person with new values
      const updatedPerson = {
        ...formData,
        ...personPrefilledValues,
        groupList: formatedGroups,
      };

      if (!_.isEqual(formData, updatedPerson)) {
        try {
          handleModalClose();
          dispatch(updateOnePerson(updatedPerson));
          dispatch(addGroup(newGroups));
          dispatch(setFormType("addPerson"));
          reset();
          await axiosInstance.put("people", updatedPerson);
        } catch (error) {
          console.error(error);
        }
      } else {
        handleModalClose();
      }
    } else {
      handleModalClose();

      // format group form data to match group schema
      const formatedGroups = formatFormGroups(formGroups, userEmail);
      const newGroups = formatedGroups.filter((group) => group.isNew);

      // create new person and add group data
      const newPerson = {
        ...data,
        personId: uuidv4(),
        groupList: formatedGroups,
        favorite,
        userEmail,
      };

      dispatch(addOnePerson(newPerson));
      dispatch(addGroup(newGroups));
      reset();
      dispatch(setFormType("addPerson"));
      try {
        await axiosInstance.post("people", newPerson);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
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
        className="border border-gray-200 rounded px-4 py-1"
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
      <label htmlFor="group">Group</label>
      <AsyncCreatableSelect
        onChange={handleGroupChange}
        isMulti
        defaultOptions
        placeholder={"Add person to a group..."}
        loadOptions={getGroupOptions}
        value={formGroups && formGroups}
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
        <SvgHeart className="text-red-500 fill-current" onClick={handleFavoritePerson} />
      ) : (
        <SvgHeart className="text-gray-500" onClick={handleFavoritePerson} />
      )}
      <div>
        <Button primary type="submit">
          {formType === "editPerson" ? "Save Changes" : "Add Person"}
        </Button>
      </div>
    </form>
  );
};

export default PersonForm;
