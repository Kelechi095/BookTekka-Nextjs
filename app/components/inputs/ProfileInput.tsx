"use client";

import { UseFormRegister, FieldValues, FieldErrors } from "react-hook-form";

interface InputProps {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}

const Input = ({
  id,
  label,
  type,
  disabled,
  required,
  register,
  errors,
}: InputProps) => {
  return (
    <div className="w-full relative">
      <label
        htmlFor={id}
        className={`cursor-text text-md mb-2
          
          
          `}
      >
        {label}
      </label>

      <textarea
        autoComplete="off"
        id={id}
        disabled={disabled}
        {...register(id, { required })}
        placeholder=""
        className={`w-full px-4 outline-none bg-white border-2 rounded-md disabled:opacity-70 disabled:cursor-not-allowed
               `}
      />
    </div>
  );
};

export default Input;
