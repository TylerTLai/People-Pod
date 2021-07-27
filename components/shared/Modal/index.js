import { FiXCircle } from "react-icons/fi";
import { useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Button from "../Button";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../../redux/slices/modalSlice";
import { generateModalLabels } from "./helper";
import PersonForm from "../Form/PersonForm";
import GroupForm from "../Form/GroupForm";

const Modal = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.modalReducer.isOpen);
  const formType = useSelector((state) => state.modalReducer.formType);

  const [modalLabels, setModalLabels] = useState({});

  useEffect(() => {
    setModalLabels(generateModalLabels(formType));
  }, [formType]);

  const handleModalClose = () => {
    dispatch(closeModal());
  };

  return (
    <Transition show={isOpen}>
      <Dialog
        open={isOpen}
        onClose={handleModalClose}
        className="fixed z-10 inset-0 overflow-y-auto"
      >
        <div className="flex items-center justify-center min-h-screen">
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

          <div className="bg-white rounded-lg w-3/4 sm:w-1/3 mx-auto z-20 p-6">
            <Dialog.Title>
              <div className="flex justify-between">
                <p className="text-2xl text-gray-800 font-semibold">
                  {modalLabels.title}
                </p>
                <button
                  className="focus:outline-none"
                  type="button"
                  aria-label="close modal"
                  aria-hidden="true"
                  onClick={handleModalClose}
                >
                  <FiXCircle size={24} color="#1F2937" />
                </button>
              </div>
            </Dialog.Title>
            <Dialog.Description className="text-sm text-gray-500 mb-5">
              {modalLabels.description}
            </Dialog.Description>
            <div>
              {modalLabels.form === "person" ? (
                <PersonForm handleModalClose={handleModalClose} />
              ) : (
                <GroupForm handleModalClose={handleModalClose} />
              )}
            </div>
            <Button secondary onClick={handleModalClose}>
              Cancel
            </Button>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;
