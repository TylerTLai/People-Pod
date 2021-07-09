import Link from "next/link";
import PersonPic from "./PersonPic";
import PersonBio from "./PersonBio";
import CardControls from "./CardControls";

const PersonCard = ({ person }) => {
  return (
    <Link href={`/person/${person?.personId}`}>
      <div className="flex flex-col bg-white border-2 border-white rounded-lg p-5 mt-9 hover:border-gray-300 transition duration-300 ease-in-out">
        <div className="flex space-x-4">
          <PersonPic person={person} />
          <PersonBio person={person} />
        </div>
        <CardControls person={person} />
      </div>
    </Link>
  );
};

export default PersonCard;
