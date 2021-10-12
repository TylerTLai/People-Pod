import { useUser } from "@auth0/nextjs-auth0";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import AsyncCreatableSelect from "react-select/async-creatable";
import { v4 as uuidv4 } from "uuid";
import axiosInstance from "../../../../config/axios";
import { addGroup } from "../../../../redux/slices/groupSlice";
import { setFormType } from "../../../../redux/slices/modalSlice";
import {
  addOnePerson,
  favoritePerson,
  updateOnePerson,
} from "../../../../redux/slices/peopleSlice";
import Button from "../../Button";
import { convertToCamelize, formatFormGroups, setPersonPrefilledValues } from "./helper";

const _ = require("lodash");

const PersonForm = ({ handleModalClose }) => {
  const dispatch = useDispatch();
  const { user } = useUser();
  const userEmail = user?.email;

  const formType = useSelector((state) => state.modalReducer.formType);
  const formData = useSelector((state) => state.modalReducer.formData);

  const [favorite, setFavorite] = useState(formData.favorite);
  const [formGroups, setFormGroups] = useState([]);
  const { personId } = formData;

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

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
    <form onSubmit={handleSubmit(onSubmit)} data-testid="add-person-form">
      <fieldset className="flex flex-col mb-12">
        <legend className="text-2xl font-bold uppercase text-gray-700">About</legend>
        <label htmlFor="firstName" className="text-base leading-7 text-blueGray-500 mt-4">
          First Name
        </label>
        {errors.firstName && (
          <span className="text-red-500 text-xs tracking-wider">
            {errors?.firstName?.message}
          </span>
        )}
        <input
          className="bg-blueGray-100 rounded px-4 py-2"
          id="firstName"
          name="firstName"
          type="text"
          autoFocus
          placeholder={
            formType === "editPerson" && formData?.firstName ? formData.firstName : "John"
          }
          {...register("firstName", {
            required: { value: true, message: "First name is required." },
            pattern: { value: /^[A-Za-z]+$/i, message: "Invalid first name." },
          })}
        />

        <label htmlFor="lastName" className="text-base leading-7 text-blueGray-500 mt-4">
          Last Name
        </label>
        {errors.lastName && (
          <span className="text-red-500 text-xs tracking-wider">
            {errors?.lastName?.message}
          </span>
        )}
        <input
          className="bg-blueGray-100 rounded px-4 py-2"
          id="lastName"
          name="lastName"
          type="text"
          placeholder={
            formType === "editPerson" && formData?.lastName ? formData.lastName : "Smith"
          }
          {...register("lastName", {
            pattern: { value: /^[A-Za-z]+$/i, message: "Invalid last name." },
          })}
        />
        <label htmlFor="birthday" className="text-base leading-7 text-blueGray-500 mt-4">
          Birthday
        </label>
        <input
          className="bg-blueGray-100 rounded px-4 py-2"
          id="birthday"
          name="birthday"
          type="text"
          placeholder={
            formType === "editPerson" && formData?.birthday
              ? formData.birthday
              : "January 1, 1999"
          }
          {...register("birthday")}
        />
        <label htmlFor="email" className="text-base leading-7 text-blueGray-500 mt-4">
          Email
        </label>
        {errors.email && (
          <span className="text-red-500 text-xs tracking-wider">
            {errors?.email?.message}
          </span>
        )}
        <input
          className="bg-blueGray-100 rounded px-4 py-2"
          id="email"
          name="email"
          type="email"
          placeholder={
            formType === "editPerson" && formData?.email
              ? formData.email
              : "john@smith.com"
          }
          {...register("email", {
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address.",
            },
          })}
        />
        <label htmlFor="location" className="text-base leading-7 text-blueGray-500 mt-4">
          Location
        </label>
        <input
          className="bg-blueGray-100 rounded px-4 py-2"
          id="location"
          name="location"
          type="text"
          placeholder={
            formType === "editPerson" && formData?.location
              ? formData.location
              : "San Francisco, California"
          }
          {...register("location")}
        />
        <label htmlFor="address" className="text-base leading-7 text-blueGray-500 mt-4">
          Address
        </label>
        <input
          className="bg-blueGray-100 rounded px-4 py-2"
          id="address"
          name="address"
          type="text"
          placeholder={
            formType === "editPerson" && formData?.address
              ? formData.address
              : "1111 John Street, San Francisco, CA, 94143"
          }
          {...register("address")}
        />
        <label
          htmlFor="phoneNumber"
          className="text-base leading-7 text-blueGray-500 mt-4"
        >
          Phone Number
        </label>
        <input
          className="bg-blueGray-100 rounded px-4 py-2 "
          id="phoneNumber"
          name="phoneNumber"
          type="tel"
          placeholder={
            formType === "editPerson" && formData?.phoneNumber
              ? formData.phoneNumber
              : "123-456-7890"
          }
          {...register("phoneNumber")}
        />
        <label htmlFor="group" className="text-base leading-7 text-blueGray-500 mt-4">
          Group
        </label>
        <AsyncCreatableSelect
          onChange={handleGroupChange}
          isMulti
          defaltOptions
          placeholder={"Add this person to a group..."}
          loadOptions={getGroupOptions}
          value={formGroups && formGroups}
        />
        <label htmlFor="quickNote" className="text-base leading-7 text-blueGray-500 mt-4">
          Quick Note
        </label>
        <textarea
          className="w-full h-32 px-4 py-2 text-base rounded border text-blueGray-500 autoexpand"
          id="quickNote"
          type="text"
          name="quickNote"
          placeholder={
            formType === "editPerson" && formData?.quickNote
              ? formData.quickNote
              : "Likes to party like it's 1999."
          }
          {...register("quickNote")}
        ></textarea>

        {/* {favorite ? (
          <div>
            <Button
              secondary
              onClick={handleFavoritePerson}
              icon={<SvgHeart className="text-red-500 fill-current" />}
            >
              <p>UnFavorite</p>
            </Button>
          </div>
        ) : (
          <div>
            <Button
              secondary
              onClick={handleFavoritePerson}
              icon={<SvgHeart className="text-gray-500" />}
            >
              <p>Favorite</p>
            </Button>
          </div>
        )} */}

        <div className="flex">
          <label className="flex items-center">
            <input
              type="checkbox"
              className="form-checkbox"
              placeholder="Favorite this person"
              {...register("favorite")}
            />
            <span className="ml-2 text-blueGray-500">Favorite this person</span>
          </label>
        </div>
      </fieldset>
      <fieldset className="flex flex-col mb-12">
        <legend className="text-2xl font-bold uppercase text-gray-700">Social</legend>
        <label
          htmlFor="facebookId"
          className="text-base leading-7 text-blueGray-500 mt-4"
        >
          Facebook
        </label>
        <input
          className="bg-blueGray-100 rounded px-4 py-2"
          id="facebookId"
          name="facebookId"
          type="text"
          placeholder={
            formType === "editPerson" && formData?.facebookId
              ? formData.facebookId
              : "https://www.facebook.com/johndoe"
          }
          {...register("facebookId")}
        />
        <label htmlFor="twitterId" className="text-base leading-7 text-blueGray-500 mt-4">
          Twitter
        </label>
        <input
          className="bg-blueGray-100 rounded px-4 py-2"
          id="twitterId"
          name="twitterId"
          type="text"
          placeholder={
            formType === "editPerson" && formData?.twitterId
              ? formData.twitterId
              : "https://www.twitter.com/johndoe"
          }
          {...register("twitterId")}
        />
        <label
          htmlFor="instagramId"
          className="text-base leading-7 text-blueGray-500 mt-4"
        >
          Instagram
        </label>
        <input
          className="bg-blueGray-100 rounded px-4 py-2"
          id="instagramId"
          name="instagramId"
          type="text"
          placeholder={
            formType === "editPerson" && formData?.instagramId
              ? formData.instagramId
              : "https://www.instagram.com/johndoe"
          }
          {...register("instagramId")}
        />
        <label
          htmlFor="linkedinId"
          className="text-base leading-7 text-blueGray-500 mt-4"
        >
          LinkedIn
        </label>
        <input
          className="bg-blueGray-100 rounded px-4 py-2"
          id="linkedinId"
          name="linkedinId"
          type="text"
          placeholder={
            formType === "editPerson" && formData?.linkedinId
              ? formData.linkedinId
              : "https://www.linkedin.com/johndoe"
          }
          {...register("linkedinId")}
        />
        <label htmlFor="website" className="text-base leading-7 text-blueGray-500 mt-4">
          Website
        </label>
        <input
          className="bg-blueGray-100 rounded px-4 py-2"
          id="website"
          name="website"
          type="text"
          placeholder={
            formType === "editPerson" && formData?.website
              ? formData.website
              : "https://www.johndoe.com"
          }
          {...register("website")}
        />
      </fieldset>

      <div>
        <Button primary type="submit" className="w-full">
          <p className="text-center w-full text-lg">
            {formType === "editPerson" ? "Save Changes" : "Add Person"}
          </p>
        </Button>
      </div>
    </form>
  );
};

export default PersonForm;
