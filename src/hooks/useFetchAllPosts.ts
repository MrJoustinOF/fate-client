import { useCallback, useEffect, useState } from "react";

export const useFetchAllPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = useCallback(async () => {
    const posts = await (
      await fetch("http://localhost:3001/api/fate/posts")
    ).json();

    setPosts(posts.reverse());
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return [posts, loading];
};
