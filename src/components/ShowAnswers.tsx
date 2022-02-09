import React, { useState } from "react";
import { Answer } from "./Answer";
import { AnswerForm } from "./AnswerForm";

type ShowAnswersProps = {
  showAnswerForm: boolean;
  comment_id: string;
  answers: [];
  fetchAnswersAgain: () => any;
};

export const ShowAnswers = ({
  showAnswerForm,
  comment_id,
  answers,
  fetchAnswersAgain,
}: ShowAnswersProps) => {
  const [lastAnswer]: any = answers;

  const [showOthers, setShowOthers] = useState(false);

  const handleShowOthers = () => {
    setShowOthers(!showOthers);
  };

  return (
    <>
      {showAnswerForm && (
        <AnswerForm
          comment_id={comment_id}
          fetchAnswersAgain={fetchAnswersAgain}
        />
      )}

      {lastAnswer && (
        <Answer answer={lastAnswer} fetchAnswersAgain={fetchAnswersAgain} />
      )}

      {answers.length > 1 &&
        showOthers &&
        answers.map(
          (answer: any) =>
            answer._id !== lastAnswer._id && (
              <Answer
                key={answer._id}
                answer={answer}
                fetchAnswersAgain={fetchAnswersAgain}
              />
            )
        )}

      {answers.length > 1 && (
        <p
          className="text-red-400 cursor-pointer block mx-auto w-11/12 md:w-4/5"
          onClick={handleShowOthers}
        >
          {!showOthers ? "See more" : "See less"}
        </p>
      )}
    </>
  );
};
