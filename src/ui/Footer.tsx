import React from "react";
import brand from "./../img/brand.svg";

export const Footer = () => {
  return (
    <div className="wbda flex items-end">
      <div className="w-full bg-red-500 text-white p-2 md:flex justify-between">
        <div>
          <div className="flex items-center">
            <img src={brand} className="inline-block mr-1" alt="brand-svg" />
            <h2 className="inline-block text-white text-2xl md:text-3xl">
              Fate
            </h2>
          </div>
          <p className="my-1">&#169;2022 Fate Network</p>
        </div>

        <ul className="pt-4 md:pt-0">
          <li>Discord</li>
          <li>Twitter</li>
          <li>Instagram</li>
          <li>Youtube</li>
        </ul>
      </div>
    </div>
  );
};
