import { FiEdit, FiHeart, FiTrash2 } from "react-icons/fi";
import Button from "../../../shared/Button";

const CardControls = () => {
  return (
    <div className="flex flex-wrap justify-between mt-4 ">
      <div>
        <Button icon={<FiHeart />}>Favorite</Button>
      </div>
      <div className="mx-4">
        <Button icon={<FiEdit />}>Edit</Button>
      </div>
      <div className="ml-auto">
        <Button icon={<FiTrash2 />}>Delete</Button>
      </div>
    </div>
  );
};

export default CardControls;
