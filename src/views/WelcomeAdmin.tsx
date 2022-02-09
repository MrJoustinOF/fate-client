import React, { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { logedState, userState } from "../utils/atoms";
import { Title } from "../ui/Title";
import { useNavigate } from "react-router-dom";

export const WelcomeAdmin = () => {
  const { name, role }: any = useRecoilValue(userState);
  const loged = useRecoilValue(logedState);

  const navigate = useNavigate();

  useEffect(() => {
    !loged && navigate("/login");

    role !== "admin" && navigate("/forbidden");
  }, [loged, navigate, role]);

  return (
    <>
      <Title text={`Welcome ${name}`} />

      <h2 className="text-center mt-4 px-4 md:px-0">
        que haces aqui wn? anda a posts o el panel de usuarios y ya, esta namas
        es una pantalla pa que no devuelva null el router y ya
      </h2>
    </>
  );
};
