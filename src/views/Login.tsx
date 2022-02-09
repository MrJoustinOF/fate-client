import React from "react";
import { Title } from "../ui/Title";
import { LogInForm } from "../components/LogInForm";

export const Login = () => {
  return (
    <>
      <Title text="Log In" />

      <LogInForm />
    </>
  );
};
