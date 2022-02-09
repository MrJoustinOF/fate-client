import { useCallback, useEffect, useState } from "react";

export const useFetchMyPosts = (userId: string) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMyPosts = useCallback(async () => {
    setLoading(true);

    const posts = await (
      await fetch("http://localhost:3001/api/fate/posts/user/" + userId, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          authorization: "bearer " + localStorage.getItem("token"),
        },
      })
    ).json();

    setPosts(posts);
    setLoading(false);
  }, [userId]);

  useEffect(() => {
    fetchMyPosts();
  }, [fetchMyPosts]);

  return [posts, loading, fetchMyPosts];
};
