import { useState } from "react";

type InputField = {
  ingredient: string;
  concentration: string;
  unit: string;
};

const useDynamicFields = (initialFields: InputField[]) => {
  const [inputFields, setInputFields] = useState<InputField[]>(initialFields);

  const handleAddField = () => {
    setInputFields([
      ...inputFields,
      { ingredient: "", concentration: "", unit: "" },
    ]);
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
    setInputFields,
  };
};

export default useDynamicFields;
