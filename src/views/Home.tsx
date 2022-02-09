import React from "react";
import { Link } from "react-router-dom";
import { useFetchHomePosts } from "../hooks/useFetchHomePosts";
import { Loader } from "../ui/Loader";
import { MainPost } from "../components/MainPost";
import { HomePostsCarousel } from "../components/HomePostsCarousel";
import { Hero } from "../ui/Hero";

export const Home = () => {
  const [posts, loading]: any = useFetchHomePosts();

  const [lastPost]: any = posts;

  return (
    <>
      {!loading ? (
        <>
          <Hero />
          <div className="py-4"></div>

          <MainPost post={lastPost} />

          <div className="py-2"></div>
          <HomePostsCarousel posts={posts} />

          <div className="flex justify-center">
            <Link
              to="/posts"
              className="bg-red-500 text-white font-semibold px-4 py-2 my-4 text-xl text-center rounded"
            >
              All posts
            </Link>
          </div>
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};
