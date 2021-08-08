import { useDispatch } from "react-redux";
import SvgHeart from "../../shared/Icons/Heart";
import SvgTrash2 from "../../shared/Icons/Trash2";
import SvgEdit from "../../shared/Icons/Edit";
import {
  favoritePerson,
  setAllPeople,
  setPersonId,
} from "../../../redux/slices/peopleSlice";
import IconButton from "../../shared/IconButton";
import { openModal, setFormData, setFormType } from "../../../redux/slices/modalSlice";
import axiosInstance from "../../../config/axios";

const Summary = ({ person }) => {
  const dispatch = useDispatch();

  const { personId } = person;

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
    try {
      const res = await axiosInstance.delete("people", {
        data: { personId },
      });

      const { deletedPerson, people } = res.data;
      dispatch(setAllPeople(people));
      dispatch(setPersonId(null));
    } catch (error) {
      console.error("error message: ", error.message);
    }
  };

  return (
    <section className="flex flex-col items-center justify-center pb-6 mt-8">
      <img
        src="https://dummyimage.com/200x200/F3F4F7/8693ac"
        alt="placeholder"
        className="rounded-full w-1/3 h-auto mb-5"
      />
      <div className="flex flex-col w-full items-center">
        <h2 className="mb-1 text-2xl font-semibold tracking-wider title-font text-gray-800">
          {person.firstName} {person.lastName}
        </h2>
        <div className="mt-8 space-x-5">
          <IconButton onClick={handleFavoritePerson} icon={<SvgHeart />} />
          <IconButton onClick={handleEditPerson} icon={<SvgEdit />} />
          <IconButton onClick={handleDeletePerson} icon={<SvgTrash2 />} />
        </div>
      </div>
    </section>
  );
};

export default Summary;
