import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { logedState, userState } from "../utils/atoms";
import { UsersList } from "../components/UsersList";
import { Title } from "../ui/Title";

export const UsersPanel = () => {
  const loged = useRecoilValue(logedState);
  const { role }: any = useRecoilValue(userState);

  const navigate = useNavigate();

  useEffect(() => {
    !loged && navigate("/login");
    role !== "admin" && navigate("/forbidden");
  }, [loged, navigate, role]);

  return (
    <>
      <Title text="Users Panel" />

      <UsersList />
    </>
  );
};
