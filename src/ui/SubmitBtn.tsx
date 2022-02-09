import React from "react";

type SubmitBtnProps = {
  text: string;
  onClick: (e: any) => any;
};

export const SubmitBtn = ({ text, onClick }: SubmitBtnProps) => {
  return (
    <input
      type="submit"
      value={text}
      className="bg-red-500 hover:bg-red-600 text-white cursor-pointer w-full block font-bold text-xl rounded h-10 transition-all"
      onClick={onClick}
    />
  );
};
