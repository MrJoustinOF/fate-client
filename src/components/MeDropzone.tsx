import React from "react";
import { useDropzone } from "react-dropzone";

type MeDropzoneProps = {
  setAvatarData: (any: any) => any;
};

export const MeDropzone = ({ setAvatarData }: MeDropzoneProps) => {
  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    accept: "image/*",
    onDrop: ([file]) => {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        const { result } = event.target;

        setAvatarData(result);
      };
      reader.readAsDataURL(file);
    },
  });

  return (
    <div {...getRootProps({ className: "dropzone" })}>
      <input {...getInputProps()} />
      <button className="bg-red-500 hover:bg-red-600 text-white cursor-pointer w-full block font-bold text-xl rounded h-10 my-4 transition-all">
        Upload new avatar
      </button>
    </div>
  );
};
