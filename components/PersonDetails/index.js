import Summary from "./Summary";
import About from "./About";
import Contacts from "./Contacts";
import SocialMedia from "./SocialMedia";

const PersonDetails = () => {
  return (
    <div className="border-l border-gray-200 py-7 px-5 overflow-y-auto">
      <Summary />
      <About />
      <Contacts />
      <SocialMedia />
    </div>
  );
};

export default PersonDetails;
