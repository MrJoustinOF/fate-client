import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { logedState, userState } from "../utils/atoms";
import { useFetchMyPosts } from "../hooks/useFetchMyPosts";
import { Title } from "../ui/Title";
import { Loader } from "../ui/Loader";
import { MyPostCard } from "../components/MyPostCard";
import { Subtitle } from "../ui/Subtitle";

export const MyPosts = () => {
  const { id, role }: any = useRecoilValue(userState);
  const loged = useRecoilValue(logedState);

  const navigate = useNavigate();

  const [posts, loading, fetchPostsAgain]: any = useFetchMyPosts(id);

  useEffect(() => {
    !loged && navigate("/login");

    role !== "admin" && navigate("/forbidden");
  }, [loged, navigate, role]);

  return (
    <>
      <Link to="/admin/createpost">
        <button className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 mx-4 my-2 text-center rounded transition-all duration-300">
          Create Post
        </button>
      </Link>

      <Title text="My Posts" />

      {loading ? (
        <Loader />
      ) : (
        <div className="md:grid grid-cols-3">
          {posts.map(({ _id: id, title, desc, created_at }: any) => (
            <MyPostCard
              key={id}
              id={id}
              title={title}
              desc={desc}
              created_at={created_at}
              fetchPostsAgain={fetchPostsAgain}
            />
          ))}
        </div>
      )}

      {!loading && posts.length === 0 && (
        <Subtitle text="No posts published yet" />
      )}
    </>
  );
};
