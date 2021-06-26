import ListControls from "./ListControls";
import PersonCard from "./PersonCard";

const PersonList = ({setPeople, people}) => {
  return (
    <div className="px-4 pb-10 overflow-y-auto bg-gray-100">
      <ListControls />
      {people.map(person => {
        return <PersonCard setPeople={setPeople} person={person} />
       })}
    </div>
  );
};

export default PersonList;
