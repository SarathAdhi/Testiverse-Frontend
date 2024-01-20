"use client";

import { Button } from "@ui/button";
import React from "react";
import { BuiltInProviderType } from "next-auth/providers/index";
import { LiteralUnion, signIn } from "next-auth/react";

const LoginUsingProviders = () => {
  const handleProvidersLogin = async (
    provider: LiteralUnion<BuiltInProviderType>
  ) => {
    await signIn(provider);
  };

  return (
    <div className="w-full grid gap-2">
      <Button
        onClick={async () => {
          await handleProvidersLogin("google");
        }}
      >
        Google
      </Button>

      <Button
        onClick={async () => {
          await handleProvidersLogin("github");
        }}
      >
        GitHub
      </Button>
    </div>
  );
};

export default LoginUsingProviders;
