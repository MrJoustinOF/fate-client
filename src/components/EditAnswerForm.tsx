import React, { useEffect, useState } from "react";
import { Loader } from "../ui/Loader";
import { SubmitBtn } from "../ui/SubmitBtn";

type EditAnswerFormProps = {
  answer: {};
  fetchAnswersAgain: () => any;
};

export const EditAnswerForm = ({
  answer,
  fetchAnswersAgain,
}: EditAnswerFormProps) => {
  const [desc, setDesc] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    setLoading(true);

    if (desc.trim().length !== 0) {
      const { _id: id }: any = answer;
      const { msg } = await (
        await fetch(
          "https://ur-apis-center.herokuapp.com/api/fate/answers/" + id,
          {
            method: "PUT",
            body: JSON.stringify({
              desc: desc.trim(),
            }),
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              authorization: "bearer " + localStorage.getItem("token"),
            },
          }
        )
      ).json();

      if (msg === "answer updated") {
        fetchAnswersAgain();
      }
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    const { desc }: any = answer;

    setDesc(desc);
  }, [answer]);

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <textarea
        name="desc"
        id="desc"
        defaultValue={desc}
        onChange={({ target }) => setDesc(target.value)}
        className="w-full block rounded border-black border p-2"
        placeholder="Update your answer"
      ></textarea>

      <div className="my-2">
        {!loading ? (
          <SubmitBtn text="Update answer" onClick={handleSubmit} />
        ) : (
          <Loader />
        )}
      </div>
    </form>
  );
};
