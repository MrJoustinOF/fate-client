import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { decodeToken } from "react-jwt";
import { useRecoilState } from "recoil";
import { authState } from "./../utils/atoms";
import { capFirstChar } from "./../utils/capFirstChar";
import { Input } from "../ui/Input";
import { SubmitBtn } from "../ui/SubmitBtn";
import { Error } from "../ui/Error";
import { Loader } from "../ui/Loader";

export const SignUpForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(password);
  const [birthDate, setBirthDate] = useState("");
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

    if (
      name.length === 0 ||
      email.length === 0 ||
      password.length === 0 ||
      birthDate.length === 0
    ) {
      errs.push("All fields are required");
    }

    if (name.length < 4 && name.length !== 0) {
      errs.push("Your name must be at least 4 chars");
    }

    if (!/^\w+@\w+\.\w+$/.test(email) && email.length !== 0) {
      errs.push("Your email is not valid");
    }

    if (password.length < 8 && password.length !== 0) {
      errs.push("Your password must be at least 8 chars");
    }

    if (password !== confirmPassword && password.length !== 0) {
      errs.push("Passwords are not the same");
    }

    setErrors(errs);

    if (errs.length === 0) {
      const birth_date = new Date(birthDate);

      const { msg, token } = await (
        await fetch(
          "https://ur-apis-center.herokuapp.com/api/fate/users/signup",
          {
            method: "POST",
            body: JSON.stringify({
              name,
              email,
              password,
              birth_date: birth_date.toUTCString(),
            }),
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        )
      ).json();

      if (msg === "user saved") {
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
          name="name"
          label="Name"
          value={name}
          onChange={({ target }) => setName(target.value)}
        />

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

        <Input
          type="password"
          name="confirmPassword"
          label="Confirm password"
          value={confirmPassword}
          onChange={({ target }) => setConfirmPassword(target.value)}
        />

        <Input
          type="date"
          name="birthdate"
          label="Birth Date"
          value={birthDate}
          onChange={({ target }) => setBirthDate(target.value)}
        />

        <p className="my-2">We'll give you a present for your birthday!</p>

        {!loading ? (
          <SubmitBtn text="Sign up" onClick={handleSubmit} />
        ) : (
          <Loader />
        )}
      </div>
    </form>
  );
};
