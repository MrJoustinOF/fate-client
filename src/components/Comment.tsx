import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { logedState, userState } from "../utils/atoms";
import { useFetchCommentAnswers } from "../hooks/useFetchCommentAnswers";
import { Loader } from "../ui/Loader";
import { EditCommentForm } from "./EditCommentForm";
import { ShowAnswers } from "./ShowAnswers";
import { useNavigate } from "react-router-dom";

type CommentProps = {
  comment: {};
  fetchCommentsAgain: () => any;
};

export const Comment = ({ comment, fetchCommentsAgain }: CommentProps) => {
  const { _id: comment_id, desc: commentDesc, user }: any = comment;
  const { id: userCommentId, name, avatar } = user;

  const loged = useRecoilValue(logedState);
  const { id: userId }: any = useRecoilValue(userState);

  const [onEdit, setOnEdit] = useState(false);
  const [showAnswerForm, setShowAnswerForm] = useState(false);

  const navigate = useNavigate();

  const [answers, loadingAnswers, fetchAnswersAgain]: any =
    useFetchCommentAnswers(comment_id);

  const handleDeleteComment = async () => {
    const { msg } = await (
      await fetch("http://localhost:3001/api/fate/comments/" + comment_id, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          authorization: "bearer " + localStorage.getItem("token"),
        },
      })
    ).json();

    if (msg === "comment deleted") {
      fetchCommentsAgain();
    }
  };

  const handleShowAnswerForm = () => {
    !loged && navigate("/login");

    setShowAnswerForm(!showAnswerForm);
  };

  return (
    <div className="w-11/12 md:w-4/5 mx-auto my-4">
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

          {!onEdit ? (
            <p>{commentDesc}</p>
          ) : (
            <EditCommentForm
              fetchCommentsAgain={fetchCommentsAgain}
              comment={comment}
            />
          )}

          <div className="text-red-400 transition-all">
            <p
              className="cursor-pointer inline-block mx-2"
              onClick={handleShowAnswerForm}
            >
              {!showAnswerForm ? "Reply" : "Cancel"}
            </p>
            {loged && userCommentId === userId && (
              <>
                <p
                  className="cursor-pointer inline-block mx-2"
                  onClick={() => setOnEdit(!onEdit)}
                >
                  {!onEdit ? "Update" : "Cancel"}
                </p>
                <p
                  className="cursor-pointer inline-block mx-2"
                  onClick={handleDeleteComment}
                >
                  Delete
                </p>
              </>
            )}
          </div>
        </div>
      </div>

      {!loadingAnswers ? (
        <ShowAnswers
          showAnswerForm={showAnswerForm}
          comment_id={comment_id}
          answers={answers}
          fetchAnswersAgain={fetchAnswersAgain}
        />
      ) : (
        <Loader />
      )}
    </div>
  );
};
