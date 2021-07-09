import ListControls from "./ListControls";
import PersonCard from "./PersonCard";
import { useSelector } from "react-redux";
import { useState } from "react";

const PeopleList = () => {
  const people = useSelector((state) => state.peopleReducer.people);
  const [listView, setListView] = useState(true);

  const handleView = () => {
    setListView((prev) => !prev);
  };

  return (
    <div className="px-4 pb-10 overflow-y-auto bg-gray-100">
      <ListControls handleView={handleView} listView={listView} />
      <div className={`${!listView && "grid grid-cols-3 gap-4"}`}>
        {people.map((person) => {
          return <PersonCard key={person.personId} person={person} listView={listView} />;
        })}
      </div>
    </div>
  );
};

export default PeopleList;
