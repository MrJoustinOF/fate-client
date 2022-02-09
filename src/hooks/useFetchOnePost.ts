import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const useFetchOnePost = (id: string) => {
  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchPost = useCallback(async () => {
    setLoading(true);

    const post = await (
      await fetch("https://ur-apis-center.herokuapp.com/api/fate/posts/" + id)
    ).json();

    !post && navigate("/notfound");

    setPost(post);
    setLoading(false);
  }, [id, navigate]);

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  return [post, loading];
};
