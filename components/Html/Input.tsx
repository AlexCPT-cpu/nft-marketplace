import { InputProps } from "@/types/types";
import React from "react";

const Input: React.FC<InputProps> = ({
  id,
  onChange,
  value,
  label,
  type,
  title,
  required
}) => {
  return (
    <div className="my-4">
      <h3 className="dark:text-neutral-500 text-lg mb-2">
        {title}
        <sup className="text-red-500 text-sm ml-1">*</sup>
      </h3>
      <div className="relative dark:text-neutral-500">
        <input
          onChange={onChange}
          value={value}
          type={type}
          id={id}
          required={required}
          className="
        block
        rounded-md
        px-6
        pt-6
        pb-1
        w-full
        text-md
        border
      border-gray-200
      dark:border-[#092940]
        bg-transparent
        appearance-none
        focus:outline-none
        focus:ring-0
        peer
        invalid:border-b-1
        "
          placeholder=" "
        />
        <label
          htmlFor={id}
          className="
        absolute 
        text-md
        duration-150 
        transform 
        -translate-y-3 
        scale-75 
        top-4 
        z-10 
        origin-[0] 
        left-6
        peer-placeholder-shown:scale-100 
        peer-placeholder-shown:translate-y-0 
        peer-focus:scale-75
        peer-focus:-translate-y-3
      "
        >
          {label}
        </label>
      </div>
    </div>
  );
};

export default Input;
