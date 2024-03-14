import React, { FC } from "react";
import { FormInputProps } from "../../types";

const FormInput: FC<FormInputProps> = ({
  id,
  name,
  value,
  onChange,
  placeholder,
  type,
}) => {
  return (
    <div>
      <label htmlFor={id}>{placeholder}:</label>
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
};

export default FormInput;
