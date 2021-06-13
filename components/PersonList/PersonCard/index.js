import PersonPic from "./PersonPic";
import PersonBio from "./PersonBio";
import CardControls from "./CardControls";

const PersonCard = () => {
  return (
    <div className="flex flex-col bg-white border-2 border-white rounded-lg p-5 mt-9 hover:border-gray-300 transition duration-300 ease-in-out">
      <div className="flex flex-wrap space-x-4">
        <PersonPic />
        <PersonBio />
      </div>
      <CardControls />
    </div>
  );
};

export default PersonCard;
