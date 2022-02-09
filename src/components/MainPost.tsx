import React from "react";
import { Link } from "react-router-dom";

type MainPostProps = {
  post: {};
};

export const MainPost = ({ post }: MainPostProps) => {
  const { _id: id, title, desc, images }: any = post;

  return (
    <>
      <div className="w-11/12 md:w-4/5 mx-auto my-4">
        <h2 className="text-2xl font-semibold">Last post</h2>
        <hr className="h-1 bg-red-500" />
      </div>

      <div className="my-4 w-11/12 md:w-4/5 mx-auto md:flex items-center justify-center">
        <img src={images[0]} alt="" className="w-60 md:w-96" />

        <div className="w-full my-2 h-full">
          <h2 className="text-xl font-bold capitalize text-center">{title}</h2>

          <p className="px-4 my-4 text-justify">
            {desc.length > 100 ? desc.slice(0, 300) + "..." : desc}
          </p>

          <Link
            to={"/posts/" + id}
            className="bg-red-500 py-2 px-4 text-white rounded text-lg text-center mx-4"
          >
            See more
          </Link>
        </div>
      </div>
    </>
  );
};
