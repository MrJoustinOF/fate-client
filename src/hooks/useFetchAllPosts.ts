import { useCallback, useEffect, useState } from "react";

export const useFetchAllPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = useCallback(async () => {
    const posts = await (
      await fetch("https://ur-apis-center.herokuapp.com/api/fate/posts")
    ).json();

    setPosts(posts.reverse());
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return [posts, loading];
};
