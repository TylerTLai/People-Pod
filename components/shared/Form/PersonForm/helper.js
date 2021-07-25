import { v4 as uuidv4 } from "uuid";


// sets the prefilled values for Edit Person form
export const setPersonPrefilledValues = (personData, formData) => {
  if (personData.firstName === "") personData.firstName = formData.firstName;
  if (personData.lastName === "") personData.lastName = formData.lastName;
  if (personData.quickNote === "") personData.quickNote = formData.quickNote;
  if (personData.favorite === false) personData.favorite = formData.favorite;
  if (personData.groups === []) personData.groups = formData.groups;

  return personData;
};

// converts string to camelCase
export const convertToCamelize = (str) => {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    })
    .replace(/\s+/g, "");
};

// formats groups added from form to match group schema.
export const formatFormGroups = (formGroups, userId) => {

  formGroups.forEach((group) => {
    group.name = group.label;
    delete group.label;
    group.isNew = group.__isNew__ ? group.__isNew__ : false;
    delete group.__isNew__;
    group.groupId = group.groupId ? group.groupId : uuidv4();
    group.userId = userId;
  });

  return formGroups;
};
