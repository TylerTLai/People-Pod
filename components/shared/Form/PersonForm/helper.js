export const setPersonDefaults = (personData, formData) => {
  if (personData.firstName === "") personData.firstName = formData.firstName;
  if (personData.lastName === "") personData.lastName = formData.lastName;
  if (personData.quickNote === "") personData.quickNote = formData.quickNote;
  if (personData.favorite === false) personData.favorite = formData.favorite;
  if (personData.groups === []) personData.groups = formData.groups;

  return personData;
};
