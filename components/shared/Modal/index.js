import { Dialog, Transition } from "@headlessui/react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../../redux/slices/modalSlice";
import Button from "../Button";
import GroupForm from "../Form/GroupForm";
import PersonForm from "../Form/PersonForm";
import SvgXCircle from "../Icons/XCircle";
import { modalVariants } from "./animation";
import { generateModalLabels } from "./helper";

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
        data-testid="modal"
        open={isOpen}
        onClose={handleModalClose}
        className="fixed inset-0"
      >
        <div className="relative flex items-center justify-center min-h-screen z-50">
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

          <motion.div
            variants={modalVariants}
            initial="hide"
            animate={isOpen ? "show" : "hide"}
            className="bg-white absolute top-24 rounded-lg w-11/12 sm:w-1/3 mx-auto z-40 p-6 overflow-y-auto h-3/4"
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
            <Button secondary onClick={handleModalClose} className="w-28 mb-4">
              <p className="text-center w-full">Cancel</p>
            </Button>
          </motion.div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;
