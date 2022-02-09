import React from "react";
import { Link } from "react-router-dom";
import { parseDate } from "../utils/parseDate";

type MyPostCardProps = {
  id: string;
  title: string;
  desc: string;
  created_at: string;
  fetchPostsAgain: () => any;
};

export const MyPostCard = ({
  id,
  title,
  desc,
  created_at,
  fetchPostsAgain,
}: MyPostCardProps) => {
  const date = parseDate(created_at);

  const handleDelete = async (e: any) => {
    e.preventDefault();

    const { msg } = await (
      await fetch("https://ur-apis-center.herokuapp.com/api/fate/posts/" + id, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          authorization: "bearer " + localStorage.getItem("token"),
        },
      })
    ).json();

    if (msg === "post deleted") {
      fetchPostsAgain();
    }
  };

  return (
    <div className="w-60 md:w-96 mx-auto border my-2">
      <h2 className="bg-red-500 text-white font-semibold text-lg rounded p-2">
        {title}
      </h2>

      <p className="p-4 text-justify">
        {desc.length > 100 ? desc.slice(0, 100) + "..." : desc}
      </p>

      <div className="lg:flex justify-around my-2">
        <p className="bg-red-500 text-white font-semibold p-2 rounded w-24 text-center mx-auto my-2">
          <Link to={`/posts/${id}`}>See more</Link>
        </p>

        <p className="bg-red-500 text-white font-semibold p-2 rounded w-24 text-center mx-auto my-2">
          <Link to={`/posts/${id}/edit`}>Update</Link>
        </p>

        <p
          onClick={handleDelete}
          className="cursor-pointer bg-red-500 text-white font-semibold p-2 rounded w-24 text-center mx-auto my-2"
        >
          Delete
        </p>
      </div>

      <p className="p-2 text-gray-500">Created at: {date}</p>
    </div>
  );
};
