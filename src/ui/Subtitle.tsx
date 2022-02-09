import React from "react";

type SubtitleProps = {
  text: string;
};

export const Subtitle = ({ text }: SubtitleProps) => {
  return <h2 className="text-center text-xl mt-8">{text}</h2>;
};
