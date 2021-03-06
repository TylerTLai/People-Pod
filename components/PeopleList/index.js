import { useSelector } from "react-redux";

import ListControls from "./ListControls";
import PersonCard from "./PersonCard";

const PeopleList = () => {
  const people = useSelector((state) => state.peopleReducer.people);
  const expandView = useSelector((state) => state.viewReducer.expandView);
  const listView = useSelector((state) => state.viewReducer.listView);

  return (
    <div
      className={`flex-1 max-h-full sm:min-h-full px-4 pb-20 overflow-y-auto bg-gray-100 ${
        expandView && "hidden"
      }`}
    >
      <ListControls />
      <ul className={`${!listView && "grid grid-cols-3 gap-4"}`}>
        {people?.map((person) => {
          return <PersonCard key={person.personId} person={person} listView={listView} />;
        })}
      </ul>
    </div>
  );
};

export default PeopleList;
