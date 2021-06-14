import ListControls from "./ListControls";
import PersonCard from "./PersonCard";

const PersonList = ({people}) => {
  return (
    <div className="px-4 pb-10 overflow-y-auto bg-gray-100">
      <ListControls />
      {people.map(person => {
        return <PersonCard person={person} />
       })}
    </div>
  );
};

export default PersonList;
