export const generateModalLabels = (formType) => {
  const modalLabels = {
    form: "",
    title: "",
    description: "",
    buttonText: "",
  };

  switch (formType) {
    case "addPerson":
      modalLabels.form = "person";
      modalLabels.title = "Add Person Form";
      modalLabels.description = "Add someone new to your People Pod";
      modalLabels.buttonText = "Add Person";
      return modalLabels;
    case "editPerson":
      modalLabels.form = "person";
      modalLabels.title = "Edit Person Form";
      modalLabels.description = "Edit this person's info";
      modalLabels.buttonText = "Save Changes";
      return modalLabels;
    case "addGroup":
      modalLabels.form = "group";
      modalLabels.title = "Add Group Form";
      modalLabels.description = "Add a new group";
      modalLabels.buttonText = "Add Group";
      return modalLabels;
    case "editGroup":
      modalLabels.form = "group";
      modalLabels.title = "Edit Group Form";
      modalLabels.description = "Edit this group's name";
      modalLabels.buttonText = "Save Changes";
      return modalLabels;

    default:
      return modalLabels;
  }
};
