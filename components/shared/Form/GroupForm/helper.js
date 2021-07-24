export const setGroupDefault = (groupData, formData) => {
  if (groupData.name === "") groupData.name = formData.name;
  if (groupData.value === "") groupData.value = formData.value;

  return groupData;
};
