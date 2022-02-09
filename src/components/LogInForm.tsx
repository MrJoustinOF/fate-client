import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { authState } from "./../utils/atoms";
import { capFirstChar } from "../utils/capFirstChar";
import { Input } from "../ui/Input";
import { SubmitBtn } from "../ui/SubmitBtn";
import { Error } from "../ui/Error";
import { Loader } from "../ui/Loader";
import { decodeToken } from "react-jwt";

export const LogInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors]: any = useState([]);
  const [loading, setLoading] = useState(false);

  const [{ loged }, setAuth] = useRecoilState(authState);

  const navigate = useNavigate();

  useEffect(() => {
    loged && navigate("/");
  }, [loged, navigate]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const errs = [];

    setLoading(true);

    if (email.length === 0 || password.length === 0) {
      errs.push("All fields are required");
    }

    if (!/^\w+@\w+\.\w+$/.test(email) && email.length !== 0) {
      errs.push("Your email is not valid");
    }

    if (password.length < 8 && password.length !== 0) {
      errs.push("Your password must be at least 8 chars");
    }

    setErrors(errs);

    if (errs.length === 0) {
      const { msg, token } = await (
        await fetch("http://localhost:3001/api/fate/users/token", {
          method: "POST",
          body: JSON.stringify({
            email,
            password,
          }),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        })
      ).json();

      if (token) {
        try {
          const userData: any = decodeToken(token);

          localStorage.setItem("token", token);

          setAuth({
            loged: true,
            user: userData,
          });
        } catch (error) {
          console.log(error);
        }
      } else {
        setErrors([capFirstChar(msg)]);
      }

      setLoading(false);
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
          name="email"
          label="Email"
          value={email}
          onChange={({ target }) => setEmail(target.value)}
        />

        <Input
          type="password"
          name="password"
          label="Password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />

        {!loading ? (
          <SubmitBtn text="Log in" onClick={handleSubmit} />
        ) : (
          <Loader />
        )}
      </div>
    </form>
  );
};
