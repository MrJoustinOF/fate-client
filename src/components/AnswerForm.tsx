import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { Loader } from "../ui/Loader";
import { SubmitBtn } from "../ui/SubmitBtn";
import { userState } from "../utils/atoms";

type AnswerFormProps = {
  comment_id: string;
  fetchAnswersAgain: () => any;
};

export const AnswerForm = ({
  comment_id,
  fetchAnswersAgain,
}: AnswerFormProps) => {
  const { id, name, avatar }: any = useRecoilValue(userState);

  const [desc, setDesc] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    setLoading(true);

    if (desc.trim().length) {
      const { msg } = await (
        await fetch("http://localhost:3001/api/fate/answers", {
          method: "POST",
          body: JSON.stringify({
            comment_id,
            desc: desc.trim(),
            user: { id, name, avatar },
          }),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            authorization: "bearer " + localStorage.getItem("token"),
          },
        })
      ).json();

      if (msg === "answer published") {
        fetchAnswersAgain();
      }
    } else {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={(e) => e.preventDefault()} className="w-4/5 mx-auto my-2">
      {/* w-11/12 md:w-4/5 */}
      <div className="md:flex">
        <img
          src={avatar}
          alt="user-avatar"
          className="w-12 h-12 rounded-full inline-block items-start"
        />

        <h2 className="font-bold text-lg inline-block md:hidden mx-2">
          {name}
        </h2>

        <div className="w-full md:mx-2 my-2 md:my-0">
          <h2 className="font-bold text-lg hidden md:inline-block">{name}</h2>

          <textarea
            name="desc"
            id="desc"
            defaultValue={desc}
            onChange={({ target }) => setDesc(target.value)}
            className="w-full h-16 block rounded border-black border p-2"
            placeholder="Write a answer for this comment"
          ></textarea>

          <div className="my-2">
            {!loading ? (
              <SubmitBtn text="Answer" onClick={handleSubmit} />
            ) : (
              <Loader />
            )}
          </div>
        </div>
      </div>
    </form>
  );
};
