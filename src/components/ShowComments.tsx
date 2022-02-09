import React from "react";
import { Subtitle } from "../ui/Subtitle";
import { Comment } from "./Comment";
import { CommentForm } from "./CommentForm";

type ShowCommentsProps = {
  post_id: string;
  comments: [];
  fetchCommentsAgain: () => any;
};

export const ShowComments = ({
  post_id,
  comments,
  fetchCommentsAgain,
}: ShowCommentsProps) => {
  return (
    <>
      <div className="w-11/12 md:w-4/5 mx-auto">
        <h2 className="text-2xl font-semibold">Comments: {comments.length}</h2>
        <hr className="h-1 bg-red-500" />
      </div>

      <CommentForm post_id={post_id} fetchCommentsAgain={fetchCommentsAgain} />

      {comments.length > 0 ? (
        comments.map((comment: any) => (
          <Comment
            key={comment._id}
            comment={comment}
            fetchCommentsAgain={fetchCommentsAgain}
          />
        ))
      ) : (
        <div className="mb-4">
          <Subtitle text="No comments published yet" />
        </div>
      )}
    </>
  );
};
