import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/client";
import AsyncCreatableSelect from "react-select/async-creatable";
import Button from "../../Button";
import axiosInstance from "../../../../config/axios";
import { addGroup, updateGroup } from "../../../../redux/slices/groupSlice";
import { setFormType } from "../../../../redux/slices/modalSlice";
import { convertToCamelize, formatFormGroups } from "../PersonForm/helper";
import { setGroupDefault } from "./helper";

const _ = require("lodash");

const GroupForm = ({ handleModalClose }) => {
  const dispatch = useDispatch();
  const [session] = useSession();
  const { userId } = session;

  const formType = useSelector((state) => state.modalReducer.formType);
  const formData = useSelector((state) => state.modalReducer.formData);

  const [formGroups, setFormGroups] = useState([]);
  const { register, handleSubmit, reset } = useForm();

  const addGroupButtonText = formGroups.length > 1 ? "Add Groups" : "Add Group";

  const handleGroupChange = (inputGroup) => {
    inputGroup.forEach((group) => (group.value = convertToCamelize(group.value)));
    setFormGroups(inputGroup && inputGroup);
  };

  const onSubmit = async (data) => {
    if (formType === "editGroup") {
      data.value = convertToCamelize(data.name);

      const groupDefaults = setGroupDefault(data, formData);

      const updatedGroup = {
        ...formData,
        ...groupDefaults,
      };
      console.log("what is updatedGroup ", updatedGroup);

      if (!_.isEqual(formData, updatedGroup)) {
        try {
          handleModalClose();
          await axiosInstance.put("groups", updatedGroup);
          dispatch(updateGroup(updatedGroup));
          dispatch(setFormType("addGroup"));
          reset();
        } catch (error) {
          alert("Duplicate Group! This group has already been created.");
          console.error("Error message! ", error.message);
        }
      } else {
        handleModalClose();
      }
    } else {
      handleModalClose();
      const formatedGroups = formatFormGroups(formGroups, userId);

      try {
        await axiosInstance.post("groups", formatedGroups);
        dispatch(addGroup(formatedGroups));
        dispatch(setFormType("addGroup"));
      } catch (error) {
        alert("Duplicate Group! This group has already been created.");
        console.error("Error message! ", error.message);
      }
    }
  };

  return (
    <form className="flex flex-col space-y-3 mb-5" onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="groupName">Group Name</label>
      {formType === "editGroup" ? (
        <input
          className="border border-gray-200 rounded pl-4 py-1"
          id="name"
          name="name"
          type="text"
          placeholder={
            formType === "editGroup" && formData?.name
              ? formData.name
              : "E.g. Best Friends, Coworkers, etc."
          }
          {...register("name")}
        />
      ) : (
        <AsyncCreatableSelect
          onChange={handleGroupChange}
          isMulti
          placeholder={"E.g. Best Friends, Coworkers, etc."}
          value={formGroups && formGroups}
        />
      )}
      <div>
        <Button primary type="submit">
          {formType === "editGroup" ? "Save Changes" : addGroupButtonText}
        </Button>
      </div>
    </form>
  );
};

export default GroupForm;
