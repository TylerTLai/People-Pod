export const setModalFormLabels = (formType) => {
  const formLabels = {
    form: "",
    formTitle: "",
    formDescription: "",
    formSubmitText: "",
  };

  switch (formType) {
    case "editPerson":
      formLabels.form = "person";
      formLabels.formTitle = "Edit Person Form";
      formLabels.formDescription = "Edit this person's info";
      formLabels.formSubmitText = "Save Changes";
      return formLabels;
    case "addGroup":
      formLabels.form = "group";
      formLabels.formTitle = "Add Group Form";
      formLabels.formDescription = "Add a new group";
      formLabels.formSubmitText = "Add Group";
      return formLabels;
    case "editGroup":
      formLabels.form = "group";
      formLabels.formTitle = "Edit Group Form";
      formLabels.formDescription = "Edit this group's name";
      formLabels.formSubmitText = "Save Changes";
      return formLabels;
    default:
      formLabels.form = "person";
      formLabels.formTitle = "Add Person Form";
      formLabels.formDescription = "Add someone new to your People Pod";
      formLabels.formSubmitText = "Add Person";
      return formLabels;
  }
};
