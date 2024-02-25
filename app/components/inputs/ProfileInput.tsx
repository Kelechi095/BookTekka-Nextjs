"use client";

import { UseFormRegister, FieldValues, FieldErrors } from "react-hook-form";

interface InputProps {
  id: string;
  label: string;
  disabled?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}

const ProfileInput = ({
  id,
  label,
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
        ${errors[id] ? "text-rose-500" : "text-slate-400"}
          
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
        className={`w-full py-4 px-2 outline-none bg-white border-2 rounded-md disabled:opacity-70 disabled:cursor-not-allowed
               
        ${errors[id] ? "border-rose-400" : "border-slate-300"}
        ${errors[id] ? "focus:border-rose-400" : "focus:border-slate-300"}
          
        `}
      />
    </div>
  );
};

export default ProfileInput;
