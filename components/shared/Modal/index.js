import SvgXCircle from "../Icons/XCircle";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Dialog, Transition } from "@headlessui/react";
import Button from "../Button";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../../redux/slices/modalSlice";
import { generateModalLabels } from "./helper";
import PersonForm from "../Form/PersonForm";
import GroupForm from "../Form/GroupForm";
import { modalVariants } from "./animation";

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
        className="fixed inset-0 overflow-y-auto"
      >
        <div className="relative flex items-center justify-center min-h-screen z-30">
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

          <motion.div
            variants={modalVariants}
            initial="hide"
            animate={isOpen ? "show" : "hide"}
            className="bg-white absolute top-24 rounded-lg w-11/12 sm:w-1/3 mx-auto z-40 p-6"
          >
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
                  <SvgXCircle className="text-gray-400" width={24} height={24} />
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
          </motion.div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;
