"use client";

import { UseFormRegister, FieldValues, FieldErrors } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

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
  register,
  errors
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

      <input
        autoComplete="off"
        id={id}
        disabled={disabled}
        {...register(id, {
          required: `${
          type === "password"
              ? "Password"
              : "Input"
          } is required`,
        })}
        placeholder=""
        type={type}
        className={`w-full px-2 py-4 outline-none bg-white border rounded-md disabled:opacity-70 disabled:cursor-not-allowed
        ${errors[id] ? "border-rose-400" : "border-neutral-300"}
        ${errors[id] ? "focus:border-rose-400" : "focus:border-slate-300"}
        `}
      />
      <ErrorMessage
        errors={errors}
        name={id}
        render={({ message }) => <p className="text-xs mt-1 text-rose-400">{message}</p>}
      />
    </div>
  );
};

export default Input;
