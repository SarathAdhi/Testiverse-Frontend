"use client";

import { Button } from "@ui/button";
import { Input } from "@ui/input";
import { signIn } from "next-auth/react";
import React from "react";
import { FieldValues, useForm } from "react-hook-form";

const CredentialsRegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const handleLogin = async (values: FieldValues) => {
    console.log(values);

    await signIn("credentials", {
      ...values,
      callbackUrl: "/",
    });
  };

  return (
    <form className="w-full grid gap-4" onSubmit={handleSubmit(handleLogin)}>
      <Input
        {...register("username")}
        label="Username"
        name="username"
        required
      />

      <Input
        {...register("email")}
        label="Email address"
        type="email"
        name="email"
        required
      />

      <Input
        {...register("password")}
        label="Password"
        type="password"
        name="password"
        required
      />

      <Button type="submit">Register</Button>
    </form>
  );
};

export default CredentialsRegisterForm;
