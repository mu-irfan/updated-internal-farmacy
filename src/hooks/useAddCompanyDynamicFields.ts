import { useState } from "react";

const useCompanyDynamicFields = (initialCount: number) => {
  const [inputFields, setInputFields] = useState(Array(initialCount).fill(""));

  const handleAddField = () => {
    setInputFields([...inputFields, ""]);
  };

  const handleDeleteField = (index: number) => {
    if (inputFields.length > 1) {
      const updatedFields = inputFields.filter((_, i) => i !== index);
      setInputFields(updatedFields);
    }
  };

  const handleFieldChange = (index: number, value: string) => {
    const updatedFields = [...inputFields];
    updatedFields[index] = value;
    setInputFields(updatedFields);
  };

  return {
    inputFields,
    handleAddField,
    handleDeleteField,
    handleFieldChange,
  };
};

export default useCompanyDynamicFields;
