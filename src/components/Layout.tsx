import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { decodeToken } from "react-jwt";
import { useRecoilState } from "recoil";
import { authState } from "./../utils/atoms";
import { Navbar } from "./Navbar";
import { Footer } from "../ui/Footer";

export const Layout = () => {
  const [, setAuth] = useRecoilState(authState);

  useEffect(() => {
    const token: any = localStorage.getItem("token");

    if (token) {
      try {
        const user: any = decodeToken(token);

        setAuth({
          loged: true,
          user,
        });
      } catch (error) {
        console.log(error);
      }
    }
  }, [setAuth]);

  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};
