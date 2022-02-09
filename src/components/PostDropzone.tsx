import React from "react";
import { useDropzone } from "react-dropzone";

type PostDropzoneProps = {
  setImages: (any: any) => any;
};

export const PostDropzone = ({ setImages }: PostDropzoneProps) => {
  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 5,
    accept: "image/*",
    onDrop: (files) => {
      const filesToState: any = [];

      files.map((file) => {
        const reader = new FileReader();
        reader.onload = ({ target }) => {
          const { result }: any = target;

          setImages([...filesToState, result]);
          filesToState.push(result);
        };

        reader.readAsDataURL(file);

        return 0;
      });
    },
  });

  return (
    <div {...getRootProps({ className: "dropzone" })}>
      <input {...getInputProps()} />
      <button className="bg-red-500 hover:bg-red-600 text-white cursor-pointer w-full block font-bold text-xl rounded h-10 my-4 transition-all">
        Upload images
      </button>
    </div>
  );
};
