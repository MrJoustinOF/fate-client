import { useCallback, useEffect, useState } from "react";

export const useFetchHomePosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = useCallback(async () => {
    const posts = await (
      await fetch("http://localhost:3001/api/fate/posts/home")
    ).json();

    setPosts(posts);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return [posts, loading];
};
