import React, { useEffect, useState } from "react";
import { Loader } from "../ui/Loader";
import { SubmitBtn } from "../ui/SubmitBtn";

type EditCommentFormProps = {
  comment: {};
  fetchCommentsAgain: () => any;
};

export const EditCommentForm = ({
  comment,
  fetchCommentsAgain,
}: EditCommentFormProps) => {
  const [desc, setDesc] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    setLoading(true);

    if (desc.trim().length !== 0) {
      const { _id: id }: any = comment;

      const { msg } = await (
        await fetch("http://localhost:3001/api/fate/comments/" + id, {
          method: "PUT",
          body: JSON.stringify({
            desc: desc.trim(),
          }),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            authorization: "bearer " + localStorage.getItem("token"),
          },
        })
      ).json();

      if (msg === "comment updated") {
        fetchCommentsAgain();
      }
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    const { desc }: any = comment;

    setDesc(desc);
  }, [comment]);

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <textarea
        name="desc"
        id="desc"
        defaultValue={desc}
        onChange={({ target }) => setDesc(target.value)}
        className="w-full block rounded border-black border p-2"
        placeholder="Update your comment"
      ></textarea>

      <div className="my-2">
        {!loading ? (
          <SubmitBtn text="Update comment" onClick={handleSubmit} />
        ) : (
          <Loader />
        )}
      </div>
    </form>
  );
};
