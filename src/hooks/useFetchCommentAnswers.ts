import { useCallback, useEffect, useState } from "react";

export const useFetchCommentAnswers = (id: string) => {
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAnswers = useCallback(async () => {
    setLoading(true);

    const answers = await (
      await fetch(
        "https://ur-apis-center.herokuapp.com/api/fate/answers/comment/" + id
      )
    ).json();

    setAnswers(answers.reverse());
    setLoading(false);
  }, [id]);

  useEffect(() => {
    fetchAnswers();
  }, [fetchAnswers]);

  return [answers, loading, fetchAnswers];
};
