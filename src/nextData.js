const nextData = ({ formData, index, indexData }) => {
  const isNew = Object.keys(formData[index]).length === 0;

  // unset current edit index if editing a different entry or adding a new entry
  if (indexData.isEditing || isNew) {
    const currentEditingIndex = formData.findIndex((x) => x.isEditing);

    if (currentEditingIndex > -1) {
      formData[currentEditingIndex].isEditing = false;
    }
  }

  return Object.assign([], formData, {
    [index]: indexData,
  });
};

export default nextData;
