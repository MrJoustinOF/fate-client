import React from "react";
import { Link } from "react-router-dom";
import { useFetchAllPosts } from "../hooks/useFetchAllPosts";
import { Loader } from "../ui/Loader";
import { Title } from "../ui/Title";

export const AllPosts = () => {
  const [posts, loading]: any = useFetchAllPosts();

  return (
    <>
      <Title text="Posts" />

      {!loading ? (
        <div className="md:grid grid-cols-3">
          {posts.map(({ _id: id, title, desc, images }: any) => (
            <div className="w-60 mx-auto my-2" key={id}>
              <img src={images[0]} alt="" className="w-full" />
              <div className="">
                <h2 className="text-xl font-bold capitalize text-center mt-4">
                  {title}
                </h2>

                <p className="px-4 my-4 text-justify">
                  {desc.length > 100 ? desc.slice(0, 100) + "..." : desc}
                </p>

                <Link
                  to={"/posts/" + id}
                  className="bg-red-500 py-2 px-4 text-white rounded text-lg text-center mx-4"
                >
                  See more
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};
