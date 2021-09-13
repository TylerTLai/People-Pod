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
    <form onSubmit={handleSubmit(onSubmit)}>
      <fieldset className="flex flex-col space-y-3 mb-12">
        <legend className="text-2xl font-bold uppercase text-gray-700">About</legend>
        <label htmlFor="firstName" class="text-base leading-7 text-blueGray-500">
          First Name
        </label>
        <input
          className="bg-blueGray-100 rounded px-4 py-2"
          id="firstName"
          name="firstName"
          type="text"
          placeholder={
            formType === "editPerson" && formData?.firstName ? formData.firstName : "John"
          }
          {...register("firstName")}
        />
        <label htmlFor="lastName" class="text-base leading-7 text-blueGray-500">
          Last Name
        </label>
        <input
          className="bg-blueGray-100 rounded px-4 py-2"
          id="lastName"
          name="lastName"
          type="text"
          placeholder={
            formType === "editPerson" && formData?.lastName ? formData.lastName : "Smith"
          }
          {...register("lastName")}
        />
        <label htmlFor="birthday" class="text-base leading-7 text-blueGray-500">
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
        <label htmlFor="email" class="text-base leading-7 text-blueGray-500">
          Email
        </label>
        <input
          className="bg-blueGray-100 rounded px-4 py-2"
          id="email"
          name="email"
          type="text"
          placeholder={
            formType === "editPerson" && formData?.email
              ? formData.email
              : "john@smith.com"
          }
          {...register("email")}
        />
        <label htmlFor="location" class="text-base leading-7 text-blueGray-500">
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
        <label htmlFor="address" class="text-base leading-7 text-blueGray-500">
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
        <label htmlFor="phoneNumber" class="text-base leading-7 text-blueGray-500">
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
        <label htmlFor="group" class="text-base leading-7 text-blueGray-500">
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
        <label htmlFor="quickNote" class="text-base leading-7 text-blueGray-500">
          Quick Note
        </label>
        <textarea
          class="w-full h-32 px-4 py-2 mt-2 text-base rounded border text-blueGray-500 autoexpand"
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

        <div class="flex">
          <label class="flex items-center">
            <input
              type="checkbox"
              class="form-checkbox"
              placeholder="Favorite this person"
              {...register("favorite")}
            />
            <span class="ml-2 text-blueGray-500">Favorite this person</span>
          </label>
        </div>
      </fieldset>
      <fieldset className="flex flex-col space-y-3 mb-12">
        <legend className="text-2xl font-bold uppercase text-gray-700">Social</legend>
        <label htmlFor="facebook" class="text-base leading-7 text-blueGray-500">
          Facebook
        </label>
        <input
          className="bg-blueGray-100 rounded px-4 py-2"
          id="facebook"
          name="facebook"
          type="text"
          placeholder={
            formType === "editPerson" && formData?.facebook
              ? formData.facebook
              : "https://www.facebook.com/johndoe"
          }
          {...register("facebook")}
        />
        <label htmlFor="twitter" class="text-base leading-7 text-blueGray-500">
          Twitter
        </label>
        <input
          className="bg-blueGray-100 rounded px-4 py-2"
          id="twitter"
          name="twitter"
          type="text"
          placeholder={
            formType === "editPerson" && formData?.twitter
              ? formData.twitter
              : "https://www.twitter.com/johndoe"
          }
          {...register("twitter")}
        />
        <label htmlFor="instagram" class="text-base leading-7 text-blueGray-500">
          Instagram
        </label>
        <input
          className="bg-blueGray-100 rounded px-4 py-2"
          id="instagram"
          name="instagram"
          type="text"
          placeholder={
            formType === "editPerson" && formData?.instagram
              ? formData.instagram
              : "https://www.instagram.com/johndoe"
          }
          {...register("instagram")}
        />
        <label htmlFor="linkedin" class="text-base leading-7 text-blueGray-500">
          LinkedIn
        </label>
        <input
          className="bg-blueGray-100 rounded px-4 py-2"
          id="linkedin"
          name="linkedin"
          type="text"
          placeholder={
            formType === "editPerson" && formData?.linkedin
              ? formData.linkedin
              : "https://www.linkedin.com/johndoe"
          }
          {...register("linkedin")}
        />
        <label htmlFor="website" class="text-base leading-7 text-blueGray-500">
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
