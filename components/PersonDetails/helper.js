export const createSectionData = (personData) => {
  const sectionData = {
    title: "",
    details: [{}],
  };

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
