import React from "react";
import { Title } from "../ui/Title";
import { CreatePostForm } from "../components/CreatePostForm";

export const CreatePost = () => {
  return (
    <>
      <Title text="Create Post" />

      <CreatePostForm />
    </>
  );
};
