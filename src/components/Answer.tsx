import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { logedState, userState } from "../utils/atoms";
import { EditAnswerForm } from "./EditAnswerForm";

type AnswerProps = {
  answer: {};
  fetchAnswersAgain: () => any;
};

export const Answer = ({ answer, fetchAnswersAgain }: AnswerProps) => {
  const { _id: answer_id, desc, user }: any = answer;
  const { id: userAnswerId, name, avatar } = user;

  const loged = useRecoilValue(logedState);
  const { id: userId }: any = useRecoilValue(userState);

  const [onEdit, setOnEdit] = useState(false);

  const handleDeleteAnswer = async () => {
    const { msg } = await (
      await fetch(
        "https://ur-apis-center.herokuapp.com/api/fate/answers/" + answer_id,
        {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            authorization: "bearer " + localStorage.getItem("token"),
          },
        }
      )
    ).json();

    if (msg === "answer deleted") {
      fetchAnswersAgain();
    }
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
            <p>{desc}</p>
          ) : (
            <EditAnswerForm
              fetchAnswersAgain={fetchAnswersAgain}
              answer={answer}
            />
          )}

          <div className="text-red-400 transition-all">
            {loged && userAnswerId === userId && (
              <>
                <p
                  className="cursor-pointer inline-block mx-2"
                  onClick={() => setOnEdit(!onEdit)}
                >
                  {!onEdit ? "Update" : "Cancel"}
                </p>
                <p
                  className="cursor-pointer inline-block mx-2"
                  onClick={handleDeleteAnswer}
                >
                  Delete
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
