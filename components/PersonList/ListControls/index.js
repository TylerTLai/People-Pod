import { useContext } from 'react';
import { FiUserPlus, FiFilter, FiAlignJustify } from "react-icons/fi";
import Button from "../../shared/Button";
import { ModalContext } from '../../../context/ModalContext'


const ListControls = () => {

  const {isOpen, setIsOpen} = useContext(ModalContext);

  const addPerson = () => {
   setIsOpen(prev => !prev)
    console.log('add person')
  };

  return (
      <div className="flex items-center mt-6 justify-between">
        <Button primary icon={<FiUserPlus />} onClick={addPerson}>
          Add Person
        </Button>
        <div className="ml-auto mr-2">
          <Button icon={<FiFilter />}>Filter</Button>
        </div>
        <Button icon={<FiAlignJustify />}>Display</Button>
      </div>
  );
};

export default ListControls;
