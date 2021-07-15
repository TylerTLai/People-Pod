import { v4 as uuidv4 } from "uuid";

export const setPersonDefaults = (personData, formData) => {
  if (personData.firstName === "") personData.firstName = formData.firstName;
  if (personData.lastName === "") personData.lastName = formData.lastName;
  if (personData.quickNote === "") personData.quickNote = formData.quickNote;
  if (personData.favorite === false) personData.favorite = formData.favorite;
  if (personData.groups === []) personData.groups = formData.groups;

  return personData;
};

// converts string to camelCase
export const camelize = (str) => {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    })
    .replace(/\s+/g, "");
};

// formats groups added from form to match group schema.
export const formatFormGroups = (formGroups, userId, user) => {
  // returns an array of group objects

  formGroups.forEach((group) => {
    group.name = group.label;
    delete group.label;
    group.isNew = group.__isNew__;
    delete group.__isNew__;
    group.groupId = uuidv4();
    group.userId = userId;
    group.user = user;
  });

  return formGroups;
};
