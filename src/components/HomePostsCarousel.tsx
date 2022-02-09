import React from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { Link } from "react-router-dom";

type HomePostsCarouselProps = {
  posts: [];
};

export const HomePostsCarousel = ({ posts }: HomePostsCarouselProps) => {
  return (
    <>
      <div className="w-11/12 md:w-4/5 mx-auto my-4">
        <h2 className="text-2xl font-semibold">Other posts</h2>
        <hr className="h-1 bg-red-500" />
      </div>

      <OwlCarousel
        className="owl-theme"
        loop
        autoplay
        autoplayTimeout={2000}
        autoplayHoverPause
        responsive={{
          0: {
            items: 1,
          },
          600: {
            items: 2,
          },
          1000: {
            items: 3,
          },
        }}
      >
        {posts.map(
          ({ _id: id, title, desc, images }: any, i) =>
            i > 0 && (
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
            )
        )}
      </OwlCarousel>
    </>
  );
};
