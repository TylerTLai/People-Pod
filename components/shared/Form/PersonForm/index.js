import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
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

const PersonForm = ({ handleModalClose }) => {
  const dispatch = useDispatch();

  const formType = useSelector((state) => state.modalReducer.formType);
  const formData = useSelector((state) => state.modalReducer.formData);

  const [favorite, setFavorite] = useState(formData.favorite);
  const [formPerson, setFormPerson] = useState(formData);

  const { register, handleSubmit, reset, control } = useForm();

  useEffect(() => {
    setFormPerson(formData);
    setFavorite(formData.favorite);
  }, [formData, formData.favorite]);

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setFormPerson((prevState) => ({ ...prevState, [name]: value }));
    return console.log(e.target.value);
  };

  console.log(formPerson);

  const handleFavorite = async () => {
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
      console.log("formEdit");
      try {
        handleModalClose();
        const updatedPerson = { ...data, personId: formData.personId, favorite };
        dispatch(updateOnePerson(updatedPerson));
        const res = await axiosInstance.put("people", updatedPerson);
        reset();
        dispatch(setFormType("addPerson"));
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        handleModalClose();
        const newPerson = { ...data, personId: uuidv4(), groups: [], favorite };
        dispatch(addOnePerson(newPerson));
        const res = await axiosInstance.post("people", newPerson);
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
        {/* <input
          className="border border-gray-200 rounded pl-4 py-1"
          id="firstName"
          name="firstName"
          type="text"
          value={formPerson.firstName}
          onChange={handleFieldChange}
          placeholder={
            formType === "editPerson" && formData?.firstName
              ? formData.firstName
              : "First name..."
          }
          {...register("firstName")}
        /> */}
        <Controller
          name="firstName"
          control={control}
          defaultValue={formPerson.firstName}
          // rules={{ required: true }}
          render={({ field }) => (
            <input
              // value={formPerson.firstName}
              id="firstName"
              className="border border-gray-200 rounded pl-4 py-1"
              type="text"
              placeholder={
                formType === "editPerson" && formData?.firstName
                  ? formData.firstName
                  : "First name..."
              }
              {...field}
              onChange={handleFieldChange}
            />
          )}
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
          <AiFillHeart color="red" size="18" onClick={handleFavorite} />
        ) : (
          <AiOutlineHeart size="18" onClick={handleFavorite} />
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
