import React from "react";

type UserPanelCardProps = {
  id: string;
  avatar: string;
  name: string;
  role: string;
  fetchUsersAgain: () => any;
};

export const UserPanelCard = ({
  id,
  avatar,
  name,
  role,
  fetchUsersAgain,
}: UserPanelCardProps) => {
  const handleChangeRole = async () => {
    if (role === "client") {
      const { msg } = await (
        await fetch(
          "https://ur-apis-center.herokuapp.com/api/fate/users/setAdmin/" + id,
          {
            method: "PUT",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              authorization: "bearer " + localStorage.getItem("token"),
            },
          }
        )
      ).json();

      msg === "admin updated" && fetchUsersAgain();
    } else if (role === "admin") {
      const { msg } = await (
        await fetch(
          "https://ur-apis-center.herokuapp.com/api/fate/users/setClient/" + id,
          {
            method: "PUT",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              authorization: "bearer " + localStorage.getItem("token"),
            },
          }
        )
      ).json();

      msg === "client updated" && fetchUsersAgain();
    }
  };

  return (
    <div className="px-2 my-4">
      <div className="border border-black rounded w-full inline-flex">
        <img src={avatar} alt="user-avatar" className="w-24 h-24" />

        <div className="w-full">
          <div className="flex justify-between p-2">
            <h2 className="font-semibold">{name}</h2>

            <h2 className="uppercase">{role}</h2>
          </div>

          <div className="flex justify-center items-center">
            {role === "admin" ? (
              <button
                onClick={handleChangeRole}
                className="bg-red-500 hover:bg-red-600 text-white px-4 mx-auto cursor-pointer font-bold text-xl rounded h-10 transition-all"
              >
                Set as client
              </button>
            ) : (
              <button
                onClick={handleChangeRole}
                className="bg-red-500 hover:bg-red-600 text-white px-4 cursor-pointer font-bold text-xl rounded h-10 transition-all"
              >
                Set as admin
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
