import React from "react";
import { parseDate } from "../utils/parseDate";
import calendar from "../img/calendar.svg";

type ShowOnePostProps = {
  post: any;
};

export const ShowOnePost = ({ post }: ShowOnePostProps) => {
  const { desc, images, created_at, user } = post;
  const { avatar } = user;

  const date = parseDate(created_at);

  const [mainImg] = images;

  return (
    <>
      <div className="w-60 md:w-96 mx-auto">
        <div>
          <img src={mainImg} alt="main-post" className="my-4" />

          <div className="flex justify-between items-center">
            <span className="text-lg items-center">
              <img
                src={calendar}
                alt="calendar-svg"
                className="w-9 inline-block mr-2"
              />
              {date}
            </span>

            <img
              src={avatar}
              alt="author-avatar"
              className="w-9 h-9 rounded-full inline-block"
            />
          </div>

          <p className="my-4">{desc}</p>
        </div>
      </div>

      {images.length > 1 && (
        <>
          <div className="w-11/12 md:w-4/5 mx-auto">
            <h2 className="text-2xl font-semibold">Gallery</h2>
            <hr className="h-1 bg-red-500" />
          </div>
          <div className="md:grid grid-cols-2 my-8">
            {images.map((image: string) => {
              if (images.indexOf(image) !== 0) {
                return (
                  <img
                    key={image}
                    src={image}
                    alt="gallery-item"
                    className="w-60 md:w-96 mx-auto my-4"
                  />
                );
              }

              return null;
            })}
          </div>
        </>
      )}
    </>
  );
};
