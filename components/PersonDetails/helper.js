import { v4 as uuidv4 } from "uuid";
import SvgCake from "../shared/Icons/Cake";
import SvgClipboard from "../shared/Icons/Clipboard";
import SvgHome from "../shared/Icons/Home";
import SvgMail from "../shared/Icons/Mail";
import SvgMapPin from "../shared/Icons/MapPin";
import SvgSmartphone from "../shared/Icons/Smartphone";

export const createSectionData = (person) => {
  const sectionData = [];

  sectionData.push({
    title: "About",
    details: [
      {
        id: uuidv4(),
        value: person.quickNote ? person.quickNote : "No notes provided.",
        icon: SvgClipboard,
      },
      {
        id: uuidv4(),
        value: person.birthday ? person.birthday : "No birthday provided.",
        icon: SvgCake,
      },
      {
        id: uuidv4(),
        value: person.location ? person.location : "No location provided",
        icon: SvgMapPin,
      },
      {
        id: uuidv4(),
        value: person.address ? person.address : "No address provided",
        icon: SvgHome,
      },
      {
        id: uuidv4(),
        value: person.phoneNumber ? person.phoneNumber : "No phone number provided",
        icon: SvgSmartphone,
      },
      {
        id: uuidv4(),
        value: person.email ? person.email : "No email provided",
        icon: SvgMail,
      },
    ],
  });

  // personData currently:

  // id: 93
  // personId: "e27c036b-0583-4363-808d-1fee07cea594"
  // firstName: "test"
  // lastName: "123"
  // favorite: false
  // quickNote: "abc"
  // userId: "ckrdw9x400008w2vk5j47mlqm"
  // groups: []

  // Need to change personData to something like this:

  // id: 93
  // personId: "e27c036b-0583-4363-808d-1fee07cea594"
  // firstName: {value: "Jane", icon: null}
  // lastName: {value: "Doe", icon: null}
  // favorite: true
  // quickNote: {value: "Likes the cold side of the pillow.", icon: FiClipboard}
  // birthday: {value: "January 1st, 2222", icon: HiOutlineCake}
  // location: {value: "Austin, TX USA", icon: FiMapPin}
  // address: {value: "123 Blvd Street", icon: FiHome}
  // phoneNumber: {value: "111-222-3333", icon: FiSmartphone}
  // email: {value: "jane@doe.com", icon: FiMail}
  // userId: "ckrdw9x400008w2vk5j47mlqm"
  // groups: []

  return sectionData;
};
