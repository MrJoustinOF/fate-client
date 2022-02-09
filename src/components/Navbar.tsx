import React, { useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { useRecoilState } from "recoil";
import { authState } from "./../utils/atoms";
import brand from "./../img/brand.svg";

export const Navbar = () => {
  const [{ loged, user }, setAuth] = useRecoilState(authState);

  const authRef: { current: any } = useRef(null);
  const navBtn: { current: any } = useRef(null);
  const responsiveNav: { current: any } = useRef(null);

  const handleNav = () => {
    const { current: btn } = navBtn;
    const { current: responsive } = responsiveNav;

    btn.classList.toggle("open");
    responsive.classList.toggle("hidden");
  };

  const handleAuthRef = () => {
    const { current: btnAuth } = authRef;

    btnAuth.classList.toggle("hidden");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");

    setAuth({
      loged: false,
      user: {},
    });
  };

  const { name, role, avatar }: any = user;

  useLocation();
  const { pathname: path } = window.location;

  return (
    <div className={path === "/" ? "" : "mb-4"}>
      <div className="flex justify-between items-center bg-red-500 text-white px-2 md:px-4 py-2">
        <Link to="/">
          <h2 className="inline-block text-white text-2xl md:text-3xl">
            <img src={brand} className="inline-block mr-1" alt="brand-svg" />
            Fate
          </h2>
        </Link>

        {!loged ? (
          <div>
            <Link to="login">
              <h2 className="text-lg inline-block mx-1 md:mx-2">Login</h2>
            </Link>

            <Link to="signup">
              <h2 className="text-lg inline-block mx-1 md:mx-2">Sign up</h2>
            </Link>
          </div>
        ) : (
          <div
            onClick={handleAuthRef}
            className="dropdown hidden md:inline-block relative"
          >
            <button className="bg-main font-semibold py-2 px-4 rounded inline-flex items-center">
              <span className="mr-1 text-lg">{name}</span>
              <img
                src={avatar}
                alt="user-avatar"
                className="w-9 h-9 rounded-full bg-white"
              />
              <svg
                className="fill-current h-4 w-8"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </button>
            <ul
              ref={authRef}
              className="dropdown-menu absolute hidden text-gray-700 pt-2 "
            >
              <li>
                <Link to="me">
                  <p className="cursor-pointer rounded-t bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap">
                    My account
                  </p>
                </Link>
              </li>
              {role === "admin" && (
                <>
                  <li>
                    <Link to="admin/myposts">
                      <p className="cursor-pointer bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap">
                        My Posts
                      </p>
                    </Link>
                  </li>
                  <li>
                    <Link to="admin/users">
                      <p className="cursor-pointer rounded-b bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap">
                        Users Panel
                      </p>
                    </Link>
                  </li>
                </>
              )}
              <li>
                <p
                  onClick={handleLogout}
                  className="cursor-pointer rounded-b bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
                >
                  Logout
                </p>
              </li>
            </ul>
          </div>
        )}

        {loged && (
          <div
            id="nav-icon2"
            className="md:hidden"
            ref={navBtn}
            onClick={handleNav}
          >
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        )}
      </div>
      {loged && (
        <div
          className="bg-red-500 text-white text-center hidden transition-all"
          ref={responsiveNav}
        >
          <div className="h-full flex justify-center items-center py-4">
            <ul>
              <li>
                <Link to="me">
                  <p className="hover:bg-red-600 w-60 cursor-pointer rounded my-2 py-2 px-4 whitespace-no-wrap">
                    My account
                  </p>
                </Link>
              </li>
              {role === "admin" && (
                <>
                  <li>
                    <Link to="admin/myposts">
                      <p className="hover:bg-red-600 w-60 cursor-pointer rounded my-2 py-2 px-4 block whitespace-no-wrap">
                        My Posts
                      </p>
                    </Link>
                  </li>
                  <li>
                    <Link to="admin/users">
                      <p className="hover:bg-red-600 w-60 cursor-pointer rounded my-2 py-2 px-4 block whitespace-no-wrap">
                        Users Panel
                      </p>
                    </Link>
                  </li>
                </>
              )}
              <li>
                <img
                  src={avatar}
                  alt="user-avatar"
                  className="rounded-full h-16 w-16 bg-white mx-auto mt-6"
                />
                <p className="text-lg font-bold w-60 mb-1 py-2 px-4 whitespace-no-wrap">
                  {name}
                </p>
              </li>
              <li>
                <p
                  onClick={handleLogout}
                  className="bg-white text-red-500 font-bold hover:bg-slate-200 w-60 cursor-pointer rounded mb-2 py-2 px-4 block whitespace-no-wrap"
                >
                  Logout
                </p>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
