import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { authState } from "../utils/atoms";
import { Input } from "../ui/Input";
import { SubmitBtn } from "../ui/SubmitBtn";
import { Error } from "../ui/Error";
import { Loader } from "../ui/Loader";
import { MeDropzone } from "./MeDropzone";
import { decodeToken } from "react-jwt";

export const MeForm = () => {
  const [auth, setAuth] = useRecoilState(authState);

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [avatarData, setAvatarData]: any = useState();
  const [errors, setErrors]: any = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const { loged, user } = auth;

    !loged && navigate("/login");

    const { name, password, birth_date, avatar }: any = user;
    const date = new Date(birth_date);

    const month =
      (date.getUTCMonth() + 1).toString().length < 2
        ? "0" + (date.getUTCMonth() + 1)
        : date.getUTCMonth() + 1;

    const day =
      date.getUTCDate().toString().length < 2
        ? "0" + date.getUTCDate()
        : date.getUTCDate();

    const dateToState = `${date.getFullYear()}-${month}-${day}`;

    setName(name);
    setPassword(password);
    setBirthDate(dateToState);
    setAvatarData(avatar);
  }, [auth, navigate]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const errs = [];
    const { id }: any = auth.user;

    setLoading(true);

    if (name.length === 0 || password.length === 0 || birthDate.length === 0) {
      errs.push("All fields are required");
    }

    if (name.length < 4 && name.length !== 0) {
      errs.push("Your name must be at least 4 chars");
    }

    if (password.length < 8 && password.length !== 0) {
      errs.push("Your password must be at least 8 chars");
    }

    setErrors(errs);

    if (errors.length === 0) {
      const birth_date = new Date(birthDate);

      const { msg, token } = await (
        await fetch("http://localhost:3001/api/fate/users/" + id, {
          method: "PUT",
          body: JSON.stringify({
            name,
            password,
            avatarData,
            birth_date: birth_date.toUTCString(),
          }),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            authorization: "bearer " + localStorage.getItem("token"),
          },
        })
      ).json();

      if (msg === "user updated") {
        try {
          const data: any = decodeToken(token);

          setAuth({
            loged: true,
            user: data,
          });

          localStorage.setItem("token", token);

          navigate("/");
        } catch (error) {
          console.log(error);
        }
      }
    } else {
      setLoading(false);
    }
  };

  const { email }: any = auth.user;

  return (
    <form className="flex justify-center" onSubmit={(e) => e.preventDefault()}>
      <div className="w-60 md:w-96">
        <p className="my-4">Your email: {email}</p>

        {errors.length !== 0 &&
          errors.map((err: string) => <Error text={err} key={err} />)}

        <Input
          type="text"
          name="name"
          label="Name"
          value={name}
          onChange={({ target }) => setName(target.value)}
        />

        <Input
          type="password"
          name="password"
          label="Password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />

        <Input
          type="date"
          name="birthdate"
          label="Birth Date"
          value={birthDate}
          onChange={({ target }) => setBirthDate(target.value)}
        />

        <p>Current avatar:</p>

        <img src={avatarData} alt="user-avatar" className="w-32" />

        <MeDropzone setAvatarData={setAvatarData} />

        {!loading ? (
          <SubmitBtn text="Update" onClick={handleSubmit} />
        ) : (
          <Loader />
        )}
      </div>
    </form>
  );
};
