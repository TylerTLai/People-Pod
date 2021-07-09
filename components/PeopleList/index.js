import ListControls from "./ListControls";
import PersonCard from "./PersonCard";
import { useSelector } from "react-redux";

const PeopleList = () => {
  const people = useSelector((state) => state.peopleReducer.people);
  const expandView = useSelector((state) => state.viewReducer.expandView);
  const listView = useSelector((state) => state.viewReducer.listView);

  return (
    <div className={`px-4 pb-10 overflow-y-auto bg-gray-100 ${expandView && "hidden"}`}>
      <ListControls />
      <div className={`${!listView && "grid grid-cols-3 gap-4"}`}>
        {people.map((person) => {
          return <PersonCard key={person.personId} person={person} listView={listView} />;
        })}
      </div>
    </div>
  );
};

export default PeopleList;
