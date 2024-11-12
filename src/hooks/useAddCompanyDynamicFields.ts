import { useState } from "react";

const useCompanyDynamicFields = (initialCount: number) => {
  const [inputFields, setInputFields] = useState(Array(initialCount).fill(""));

  const handleAddField = () => {
    setInputFields([...inputFields, ""]);
  };

  const handleDeleteField = (index: number) => {
    const updatedFields = [...inputFields];
    updatedFields.splice(index, 1);
    setInputFields(updatedFields);
  };

  return {
    inputFields,
    handleAddField,
    handleDeleteField,
  };
};

export default useCompanyDynamicFields;
