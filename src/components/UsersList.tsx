import React from "react";
import { useRecoilValue } from "recoil";
import { userState } from "../utils/atoms";
import { useFetchUsers } from "../hooks/useFetchUsers";
import { Loader } from "../ui/Loader";
import { UserPanelCard } from "./UserPanelCard";

export const UsersList = () => {
  const { id: userId }: any = useRecoilValue(userState);

  const [users, loading, fetchUsersAgain]: any = useFetchUsers();

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="md:grid grid-cols-3 my-4">
          {users.map(({ _id: id, name, role, avatar }: any) => {
            if (id !== userId) {
              return (
                <UserPanelCard
                  key={id}
                  id={id}
                  name={name}
                  role={role}
                  avatar={avatar}
                  fetchUsersAgain={fetchUsersAgain}
                />
              );
            }

            return null;
          })}
        </div>
      )}
    </>
  );
};
