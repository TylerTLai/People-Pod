import ListControls from "./ListControls";
import PersonCard from "./PersonCard";
import { useSelector } from "react-redux";

const PersonList = () => {
  const people = useSelector((state) => state.peopleReducer.people);
  return (
    <div className="px-4 pb-10 overflow-y-auto bg-gray-100">
      <ListControls />
      {people.map((person) => {
        return <PersonCard key={person.personId} person={person} />;
      })}
    </div>
  );
};

export default PersonList;
