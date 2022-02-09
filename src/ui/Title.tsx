import React from "react";

type TitleProps = {
  text: string;
};

export const Title = ({ text }: TitleProps) => {
  return <h2 className="text-center text-2xl font-semibold mt-8">{text}</h2>;
};
