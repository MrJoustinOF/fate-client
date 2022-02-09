import React from "react";
import { Link } from "react-router-dom";
import { Hexagons } from "../ui/Hexagons";

export const NotFound = () => {
  const handleGoBack = () => window.history.go(-1);

  return (
    <div className="md:grid grid-cols-2 items-center">
      <Hexagons />

      <div className="text-red-500 text-center md:text-left">
        <h2 className="text-8xl font-bold">404</h2>
        <p className="text-xl">Sorry, this page doesn't exist!</p>
        {/* <div className="mt-10"> */}
        <div className="mt-4">
          <div>
            <button
              onClick={handleGoBack}
              className="my-2 text-white text-center bg-red-500 hover:bg-red-600 rounded transition-all duration-300 cursor-pointer py-2 px-4"
            >
              Go Back
            </button>
          </div>
          <div>
            <Link to="/">
              <button className="my-2 text-white text-center bg-red-500 hover:bg-red-600 rounded transition-all duration-300 cursor-pointer py-2 px-4">
                Go to Home Page
              </button>
            </Link>
          </div>
        </div>
        {/* </div> */}
      </div>
    </div>
  );
};
