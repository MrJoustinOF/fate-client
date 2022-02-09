import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { logedState, userState } from "../utils/atoms";
import { SubmitBtn } from "../ui/SubmitBtn";
import { Loader } from "../ui/Loader";

type CommentFormProps = {
  post_id: string;
  fetchCommentsAgain: () => any;
};

export const CommentForm = ({
  post_id,
  fetchCommentsAgain,
}: CommentFormProps) => {
  const loged = useRecoilValue(logedState);
  const { id, name, avatar }: any = useRecoilValue(userState);

  const [desc, setDesc] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    setLoading(true);

    if (desc.trim().length > 0) {
      const { msg } = await (
        await fetch("http://localhost:3001/api/fate/comments", {
          method: "POST",
          body: JSON.stringify({
            post_id,
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

      if (msg === "comment published") {
        fetchCommentsAgain();
      }
    } else {
      setLoading(false);
    }
  };

  return (
    <>
      {!loged ? (
        <h2 className="text-center text-xl mt-8">
          You need to{" "}
          <Link to="/login" className="text-red-500">
            log in
          </Link>{" "}
          to comment
        </h2>
      ) : (
        <form
          onSubmit={(e) => e.preventDefault()}
          className="w-11/12 md:w-4/5 mx-auto my-2"
        >
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
              <h2 className="font-bold text-lg hidden md:inline-block">
                {name}
              </h2>

              <textarea
                name="desc"
                id="desc"
                defaultValue={desc}
                onChange={({ target }) => setDesc(target.value)}
                className="w-full h-16 block rounded border-black border p-2"
                placeholder="Write a comment for us"
              ></textarea>

              <div className="my-2">
                {!loading ? (
                  <SubmitBtn text="Comment" onClick={handleSubmit} />
                ) : (
                  <Loader />
                )}
              </div>
            </div>
          </div>
        </form>
      )}
    </>
  );
};
