import { v4 as uuidv4 } from "uuid";
import SvgCake from "../shared/Icons/Cake";
import SvgClipboard from "../shared/Icons/Clipboard";
import SvgFacebook from "../shared/Icons/Facebook";
import SvgWebsite from "../shared/Icons/Globe";
import SvgHome from "../shared/Icons/Home";
import SvgInstagram from "../shared/Icons/Instagram";
import SvgLinkedin from "../shared/Icons/Linkedin";
import SvgMail from "../shared/Icons/Mail";
import SvgMapPin from "../shared/Icons/MapPin";
import SvgSmartphone from "../shared/Icons/Smartphone";
import SvgTwitter from "../shared/Icons/Twitter";

export const createSectionData = (person) => {
  const sectionData = [];

  sectionData.push({
    aboutTitle: "About",
    aboutDetails: [
      {
        id: uuidv4(),
        value: person.quickNote ? person.quickNote : "No notes provided",
        icon: SvgClipboard,
      },
      {
        id: uuidv4(),
        value: person.birthday ? person.birthday : "No birthday provided",
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
    socialTitle: "Social",
    socialDetails: [
      {
        id: uuidv4(),
        value: person.facebookId ? person.facebookId : "No Facebook provided",
        icon: SvgFacebook,
      },
      {
        id: uuidv4(),
        value: person.twitterId ? person.twitterId : "No Twitter provided",
        icon: SvgTwitter,
      },
      {
        id: uuidv4(),
        value: person.instagramId ? person.instagramId : "No Instagram provided",
        icon: SvgInstagram,
      },
      {
        id: uuidv4(),
        value: person.linkedinId ? person.linkedinId : "No LinkedIn provided",
        icon: SvgLinkedin,
      },
      {
        id: uuidv4(),
        value: person.website ? person.website : "No website provided",
        icon: SvgWebsite,
      },
    ],
  });

  return sectionData;
};
