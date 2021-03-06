import { useCallback, useEffect, useState } from "react";

export const useFetchPostComments = (id: string) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchComments = useCallback(async () => {
    setLoading(true);

    const comments = await (
      await fetch(
        "https://ur-apis-center.herokuapp.com/api/fate/comments/post/" + id
      )
    ).json();

    setComments(comments.reverse());
    setLoading(false);
  }, [id]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  return [comments, loading, fetchComments];
};
