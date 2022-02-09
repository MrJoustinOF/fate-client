import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { logedState, userState } from "../utils/atoms";
import whiteHeart from "../img/whiteHeart.svg";
import pinkHeart from "../img/pinkHeart.svg";

type ShowLikesProps = {
  likes: [];
  post_id: string;
  fetchLikesAgain: () => any;
};

export const ShowLikes = ({
  likes,
  post_id,
  fetchLikesAgain,
}: ShowLikesProps) => {
  const [liked, setLiked] = useState(false);
  const [likeId, setLikeId] = useState("");
  const { length } = likes;

  const loged = useRecoilValue(logedState);
  const { id: user_id }: any = useRecoilValue(userState);

  const navigate = useNavigate();

  const handleAddLike = async () => {
    !loged && navigate("/login");

    const { msg } = await (
      await fetch("https://ur-apis-center.herokuapp.com/api/fate/likes", {
        method: "POST",
        body: JSON.stringify({
          post_id,
          user_id,
        }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          authorization: "bearer " + localStorage.getItem("token"),
        },
      })
    ).json();

    if (msg === "like added") {
      fetchLikesAgain();
    }
  };

  const handleDeleteLike = async () => {
    const { msg } = await (
      await fetch(
        "https://ur-apis-center.herokuapp.com/api/fate/likes/" + likeId,
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

    if (msg === "like deleted") {
      fetchLikesAgain();
    }
  };

  useEffect(() => {
    if (loged) {
      const found: any = likes.find(
        ({ user_id: userId }) => userId === user_id
      );
      setLiked(!found ? false : true);
      setLikeId(!found ? "" : found._id);
    }
  }, [likes, loged, user_id]);

  return (
    <div className="flex justify-center text-center">
      <div>
        {!liked ? (
          <img
            src={whiteHeart}
            alt="white-heart"
            className="cursor-pointer"
            onClick={handleAddLike}
          />
        ) : (
          <img
            src={pinkHeart}
            alt="white-heart"
            className="cursor-pointer"
            onClick={handleDeleteLike}
          />
        )}
        <p className="mb-2">{length} likes</p>
      </div>
    </div>
  );
};
