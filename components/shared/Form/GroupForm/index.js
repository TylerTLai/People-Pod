import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSession } from "next-auth/client";
import AsyncCreatableSelect from "react-select/async-creatable";
import Button from "../../Button";
import axiosInstance from "../../../../config/axios";
import { addGroup } from "../../../../redux/slices/groupSlice";
import { setFormType } from "../../../../redux/slices/modalSlice";
import { convertToCamelize, formatFormGroups } from "../PersonForm/helper";

const GroupForm = ({ handleModalClose }) => {
  const dispatch = useDispatch();
  const [session] = useSession();
  const { userId, user } = session;

  const formType = useSelector((state) => state.modalReducer.formType);
  const [formGroups, setFormGroups] = useState([]);

  const addGroupButtonText = formGroups.length > 1 ? "Add Groups" : "Add Group";

  const handleGroupChange = (inputGroup) => {
    inputGroup.forEach((group) => (group.value = convertToCamelize(group.value)));
    setFormGroups(inputGroup && inputGroup);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
  };

  return (
    <form className="flex flex-col space-y-3 mb-5" onSubmit={handleSubmit}>
      <label htmlFor="groupName">Group Name</label>
      <AsyncCreatableSelect
        onChange={handleGroupChange}
        isMulti
        placeholder={"E.g. Best Friends, Coworkers, etc."}
        value={formGroups && formGroups}
      />
      <div>
        <Button primary type="submit">
          {formType === "editGroup" ? "Save Changes" : addGroupButtonText}
        </Button>
      </div>
    </form>
  );
};

export default GroupForm;
