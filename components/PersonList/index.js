import ListControls from "./ListControls";
import PersonCard from "./PersonCard";

const PersonList = () => {
  return (
    <div className="px-4 pb-10 overflow-y-auto bg-gray-100">
      <ListControls />
      <PersonCard />
      <PersonCard />
      <PersonCard />
      <PersonCard />
    </div>
  );
};

export default PersonList;
