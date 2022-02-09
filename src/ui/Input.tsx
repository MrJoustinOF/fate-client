import React from "react";

type InputProps = {
  type: string;
  name: string;
  label: string;
  value: any;
  onChange: (any: any) => any;
};

export const Input = ({ type, name, label, value, onChange }: InputProps) => {
  return (
    <div className="my-4">
      <label htmlFor={name} className="text-lg">
        {label}
      </label>

      {type !== "textarea" ? (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          className="w-full block h-10 rounded border-black border"
        />
      ) : (
        <textarea
          name={name}
          id={name}
          cols={30}
          rows={10}
          defaultValue={value}
          onChange={onChange}
          className="w-full block rounded border-black border"
        ></textarea>
      )}
    </div>
  );
};
