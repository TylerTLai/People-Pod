import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import Button from "../../Button";
import axiosInstance from "../../../../config/axios";
import { addOneGroup, updateOneGroup } from "../../../../redux/slices/groupSlice";
import { setFormType } from "../../../../redux/slices/modalSlice";

const GroupForm = ({ handleModalClose }) => {
  const dispatch = useDispatch();

  const formType = useSelector((state) => state.modalReducer.formType);
  const formData = useSelector((state) => state.modalReducer.formData);

  const onSubmit = async (data, e) => {
    if (formType === "editGroup") {
      try {
        handleModalClose();
        const updatedGroup = { ...data, groupId: formData.groupId, favorite };
        dispatch(updateOneGroup(updatedGroup));
        await axiosInstance.put("groups", updatedGroup);
        reset();
        dispatch(setFormType("addGroup"));
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        handleModalClose();
        const newGroup = { ...data, groupId: uuidv4(), groups: [], favorite };
        dispatch(addOneGroup(newGroup));
        await axiosInstance.post("groups", newGroup);
        reset();
        dispatch(setFormType("addGroup"));
      } catch (error) {
        console.error(error);
      }
    }
  };

  const { register, handleSubmit, reset } = useForm();

  return (
    <form className="flex flex-col space-y-3 mb-5" onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="groupName">Group Name</label>
      <input
        className="border border-gray-200 rounded pl-4 py-1"
        id="groupName"
        name="groupName"
        type="text"
        placeholder={
          formType === "editGroup" && formData?.groupName
            ? formData.groupName
            : "Group Name..."
        }
        {...register("groupName")}
      />

      <div>
        <Button primary type="submit">
          {formType === "editGroup" ? "Save Changes" : "Add Group"}
        </Button>
      </div>
    </form>
  );
};

export default GroupForm;
