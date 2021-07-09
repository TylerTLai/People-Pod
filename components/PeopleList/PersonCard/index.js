import PersonPic from "./PersonPic";
import PersonBio from "./PersonBio";
import CardControls from "./CardControls";

const PersonCard = ({ person, listView }) => {
  return (
    <>
      {listView ? (
        <div className="flex flex-col bg-white border-2 border-white rounded-lg p-5 mt-9 hover:border-gray-300 transition duration-300 ease-in-out">
          <div className="flex space-x-4">
            <PersonPic person={person} listView={listView} />
            <PersonBio person={person} />
          </div>
          <CardControls person={person} />
        </div>
      ) : (
        <div className="border-2 hover:border-gray-300 transition duration-300 ease-in-out rounded-lg mt-9 bg-white">
          <div className="flex flex-col items-center px-3 py-3">
            <PersonPic person={person} listView={listView} />
            <p className="mt-5 text-center font-semibold tracking-wider uppercase title-font text-gray-800">
              {person.firstName} {person.lastName}
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default PersonCard;
