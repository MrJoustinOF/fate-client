import { useCallback, useEffect, useState } from "react";

export const useFetchUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = useCallback(async () => {
    setLoading(true);

    const users = await (
      await fetch("https://ur-apis-center.herokuapp.com/api/fate/users", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          authorization: "bearer " + localStorage.getItem("token"),
        },
      })
    ).json();

    setUsers(users);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return [users, loading, fetchUsers];
};
