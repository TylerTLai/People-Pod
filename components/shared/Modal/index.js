import { useDispatch, useSelector } from "react-redux";
import { openModal, closeModal } from "./modalSlice";
import { Dialog, Transition } from "@headlessui/react";
import Button from "../Button";

const Modal = () => {
  const isOpen = useSelector((state) => state.modal.isOpen);
  const dispatch = useDispatch();

  return (
    <Transition
      show={isOpen}
      enter="transition duration-100 ease-out"
      enterFrom="transform scale-95 opacity-0"
      enterTo="transform scale-100 opacity-100"
      leave="transition duration-75 ease-out"
      leaveFrom="transform scale-100 opacity-100"
      leaveTo="transform scale-95 opacity-0"
    >
      <Dialog
        open={isOpen}
        onClose={() => dispatch(closeModal())}
        className="fixed z-10 inset-0 overflow-y-auto"
      >
        <div className="flex items-center justify-center min-h-screen">
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

          <div className="bg-white rounded max-w-sm mx-auto z-20 p-6">
            <Dialog.Title>
              <p className="text-2xl bold text-gray-800">Add new person</p>
            </Dialog.Title>
            <Dialog.Description>Add a new person to your People Pod</Dialog.Description>
            <div className="flex flex-col space-y-3 my-5">
              <p className="text-xl font-bold text-gray-800">Full name</p>
              <label htmlFor="firstName">First Name</label>
              <input
                className="border border-gray-200 rounded pl-4 py-1"
                id="firstName"
                name="firstName"
                type="text"
                placeholder="First name..."
              />
              <label htmlFor="lastName">Last Name</label>
              <input
                className="border border-gray-200 rounded pl-4 py-1"
                id="lastName"
                name="lastName"
                type="text"
                placeholder="Last name..."
              />
              <label htmlFor="quickNote">Quick Note</label>
              <textarea
                className="border border-gray-200 rounded pl-4 py-1"
                id="quickNote"
                name="quickNote"
                type="text"
                placeholder="Quick note..."
              />
            </div>

            <div className="flex justify-between">
              <Button onClick={() => dispatch(closeModal())}>Add Person</Button>
              <Button onClick={() => dispatch(closeModal())}>Cancel</Button>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;
