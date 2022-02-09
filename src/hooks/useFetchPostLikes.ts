import { useCallback, useEffect, useState } from "react";

export const useFetchPostLikes = (id: string) => {
  const [likes, setLikes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchLikes = useCallback(async () => {
    setLoading(true);

    const likes = await (
      await fetch(
        "https://ur-apis-center.herokuapp.com/api/fate/likes/post/" + id
      )
    ).json();

    setLikes(likes);
    setLoading(false);
  }, [id]);

  useEffect(() => {
    fetchLikes();
  }, [fetchLikes]);

  return [likes, loading, fetchLikes];
};
