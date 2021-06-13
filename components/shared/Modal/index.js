import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "./modalSlice";
import { Dialog, Transition } from "@headlessui/react";
import Button from "../Button";

const Modal = () => {
  const isOpen = useSelector((state) => state.modal.isOpen);
  const dispatch = useDispatch();

  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data, e) => {
    console.log(data);
    reset();
  };

  return (
    <Transition show={isOpen}>
      <Dialog
        open={isOpen}
        onClose={() => dispatch(closeModal())}
        className="fixed z-10 inset-0 overflow-y-auto"
      >
        <div className="flex items-center justify-center min-h-screen">
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

          <div className="bg-white rounded w-3/4 sm:w-1/3 mx-auto z-20 p-6">
            <Dialog.Title>
              <p className="text-2xl bold text-gray-800">Add Person Form</p>
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
                <div className="flex justify-between">
                  <Button primary onClick={onSubmit} type="submit">
                    Add Person
                  </Button>
                  <Button onClick={() => dispatch(closeModal())}>Cancel</Button>
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
