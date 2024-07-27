// InputField.tsx
import React from 'react';

interface InputFieldProps {
  type: string;
  name: string;
  placeholder: string;
  label?: string;
  register?: any; // Adjust type as needed
  error?: any;    // Adjust type as needed
  [key: string]: any;
}

const InputField: React.FC<InputFieldProps> = ({ type, name, placeholder, label, register, error, ...props }) => {
  return (
    <div>
      {label && <label htmlFor={name}>{label}</label>}
      <input type={type} name={name} placeholder={placeholder} {...register && register(name)} {...props} />
      {error && <span className="error">{error.message}</span>}
    </div>
  );
};

export default InputField;
