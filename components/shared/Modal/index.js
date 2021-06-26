import { FiXCircle } from "react-icons/fi";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { Dialog, Transition } from "@headlessui/react";
import Button from "../Button";
import axiosInstance from "../../../config/axios";
import { useDispatch, useSelector } from "react-redux";
import { closeModal, openModal } from "../../../redux/slices/modalSlice";
import { addOnePerson } from "../../../redux/slices/peopleSlice";

const Modal = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.modalReducer.isOpen);
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data, e) => {
    try {
      const newPerson = { ...data, personId: uuidv4() };
      dispatch(addOnePerson(newPerson));
      const res = await axiosInstance.post("people", newPerson);
      reset();
      dispatch(closeModal());
    } catch (error) {
      console.error(error);
    }
  };

  const handleClose = () => {
    dispatch(closeModal());
  };

  return (
    <Transition show={isOpen}>
      <Dialog
        open={isOpen}
        onClose={handleClose}
        className="fixed z-10 inset-0 overflow-y-auto"
      >
        <div className="flex items-center justify-center min-h-screen">
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

          <div className="bg-white rounded w-3/4 sm:w-1/3 mx-auto z-20 p-6">
            <Dialog.Title>
              <div className="flex justify-between">
                <p className="text-2xl text-gray-800 font-semibold">Add Person Form</p>
                <button
                  className="focus:outline-none"
                  type="button"
                  aria-label="close modal"
                  aria-hidden="true"
                  onClick={handleClose}
                >
                  <FiXCircle size={24} color="#1F2937" />
                </button>
              </div>
            </Dialog.Title>
            <Dialog.Description className="text-sm text-gray-500 mb-5">
              Add someone new to your People Pod.
            </Dialog.Description>
            <div>
              <p className="text-xl font-bold text-gray-800">Full name</p>
              <form
                className="flex flex-col space-y-3 mb-5"
                onSubmit={handleSubmit(onSubmit)}
              >
                <label htmlFor="firstName">First Name</label>
                <input
                  className="border border-gray-200 rounded pl-4 py-1"
                  id="firstName"
                  name="firstName"
                  type="text"
                  placeholder="First name..."
                  {...register("firstName")}
                />
                <label htmlFor="lastName">Last Name</label>
                <input
                  className="border border-gray-200 rounded pl-4 py-1"
                  id="lastName"
                  name="lastName"
                  type="text"
                  placeholder="Last name..."
                  {...register("lastName")}
                />
                <label htmlFor="quickNote">Quick Note</label>
                <textarea
                  className="border border-gray-200 rounded pl-4 py-1"
                  id="quickNote"
                  name="quickNote"
                  type="text"
                  placeholder="Quick note..."
                  {...register("quickNote")}
                />
                <div className="flex space-x-4">
                  <Button primary type="submit">
                    Add Person
                  </Button>
                  <Button secondary onClick={handleClose}>
                    Cancel
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;
