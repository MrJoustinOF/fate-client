import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { logedState, userState } from "../utils/atoms";
import { Input } from "../ui/Input";
import { Loader } from "../ui/Loader";
import { SubmitBtn } from "../ui/SubmitBtn";
import { PostDropzone } from "./PostDropzone";
import { Error } from "../ui/Error";

export const CreatePostForm = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);

  const loged = useRecoilValue(logedState);
  const { id, name, avatar, role }: any = useRecoilValue(userState);

  const navigate = useNavigate();

  useEffect(() => {
    !loged && navigate("/login");

    role !== "admin" && navigate("/forbidden");
  }, [loged, role, navigate]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const errs: any = [];

    setLoading(true);

    if (title.length === 0 || desc.length === 0 || images.length === 0) {
      errs.push("All fields are required");
    }

    if (title.length < 4 && title.length !== 0) {
      errs.push("Title must be at least 4 chars");
    }

    if (desc.length < 10 && desc.length !== 0) {
      errs.push("Description must be at least 10 chars");
    }

    if (images.length < 2 && images.length !== 0) {
      errs.push("oe ya ps, agrega una imagen mas, dejate de wbdas");
    }

    setErrors(errs);

    if (errs.length === 0) {
      const { msg } = await (
        await fetch("http://localhost:3001/api/fate/posts", {
          method: "POST",
          body: JSON.stringify({
            title,
            desc,
            imagesData: images,
            user: { id, name, avatar },
          }),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            authorization: "bearer " + localStorage.getItem("token"),
          },
        })
      ).json();

      setLoading(false);

      if (msg === "post published") {
        navigate("/admin/myposts");
      }
    } else {
      setLoading(false);
    }
  };

  return (
    <form className="flex justify-center" onSubmit={(e) => e.preventDefault()}>
      <div className="w-60 md:w-96">
        {errors.length !== 0 &&
          errors.map((err: string) => <Error text={err} key={err} />)}

        <Input
          type="text"
          name="title"
          label="Title"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />

        <Input
          type="textarea"
          name="desc"
          label="Description"
          value={desc}
          onChange={({ target }) => setDesc(target.value)}
        />

        <h2 className="mt-4">Images you'll publish:</h2>
        <p>
          Remember: You'll be able to upload only 5 images, the first one must
          be the principal
        </p>

        {images.map((img) => (
          <img
            key={images.indexOf(img)}
            src={img}
            alt="post-img"
            className="w-32 my-2"
          />
        ))}

        <PostDropzone setImages={setImages} />

        {!loading ? (
          <SubmitBtn text="Publish" onClick={handleSubmit} />
        ) : (
          <Loader />
        )}
      </div>
    </form>
  );
};
