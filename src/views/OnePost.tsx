import React from "react";
import { useParams } from "react-router-dom";
import { useFetchOnePost } from "../hooks/useFetchOnePost";
import { useFetchPostLikes } from "../hooks/useFetchPostLikes";
import { useFetchPostComments } from "../hooks/useFetchPostComments";
import { Title } from "../ui/Title";
import { Loader } from "../ui/Loader";
import { ShowOnePost } from "../components/ShowOnePost";
import { ShowLikes } from "../components/ShowLikes";
import { ShowComments } from "../components/ShowComments";

export const OnePost = () => {
  const { id }: any = useParams();

  const [post, loading]: any = useFetchOnePost(id);
  const [likes, likesLoading, fetchLikesAgain]: any = useFetchPostLikes(id);
  const [comments, commentsLoading, fetchCommentsAgain]: any =
    useFetchPostComments(id);

  return (
    <>
      <Title text={post.title || ""} />

      {!loading ? <ShowOnePost post={post} /> : <Loader />}

      {!likesLoading ? (
        <ShowLikes
          likes={likes}
          post_id={id}
          fetchLikesAgain={fetchLikesAgain}
        />
      ) : (
        <Loader />
      )}

      {!commentsLoading ? (
        <ShowComments
          comments={comments}
          post_id={id}
          fetchCommentsAgain={fetchCommentsAgain}
        />
      ) : (
        <Loader />
      )}
    </>
  );
};
