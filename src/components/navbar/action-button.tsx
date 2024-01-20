"use client";

import { Button } from "@ui/button";
import { DefaultSession } from "next-auth";
import { signIn, signOut } from "next-auth/react";

import React from "react";

type Props = {
  user: DefaultSession["user"];
};

const ActionButton = ({ user }: Props) => {
  if (user) return <Button onClick={() => signOut()}>Sign out</Button>;

  return <Button onClick={() => signIn()}>Sign in</Button>;
};

export default ActionButton;
