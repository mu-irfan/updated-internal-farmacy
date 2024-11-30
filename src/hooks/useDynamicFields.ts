import { useState } from "react";
import { nanoid } from "nanoid";

const useDynamicFields = (initialFields: Omit<InputField, "id">[]) => {
  const [inputFields, setInputFields] = useState<InputField[]>(
    initialFields?.map((field) => ({ ...field, id: nanoid() }))
  );

  const handleAddField = () => {
    setInputFields((prevFields) => [
      ...prevFields,
      { id: nanoid(), ingredient: "", concentration: "", unit: "" },
    ]);
  };

  const handleDeleteField = (index: number) => {
    setInputFields((prevFields) => prevFields.filter((_, i) => i !== index));
  };

  return {
    inputFields,
    handleAddField,
    handleDeleteField,
    setInputFields,
  };
};

export default useDynamicFields;
