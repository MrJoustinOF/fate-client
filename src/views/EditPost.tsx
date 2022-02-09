import React from "react";
import { useParams } from "react-router-dom";
import { useFetchOnePost } from "../hooks/useFetchOnePost";
import { Title } from "../ui/Title";
import { Loader } from "../ui/Loader";
import { EditPostForm } from "../components/EditPostForm";

export const EditPost = () => {
  const { id }: any = useParams();

  const [post, loading]: any = useFetchOnePost(id);

  return (
    <>
      <Title text={`Edit post: ${post.title || ""}`} />

      {!loading ? <EditPostForm post={post} /> : <Loader />}
    </>
  );
};
