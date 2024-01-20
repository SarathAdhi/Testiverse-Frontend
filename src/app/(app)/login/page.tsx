import React from "react";
import CredentialsLoginForm from "./(components)/credentials-login-form";
import { getServerAuthSession } from "@lib/auth-options";
import { redirect } from "next/navigation";
import LoginUsingProviders from "./(components)/login-using-providers";

const LoginPage = async () => {
  const session = await getServerAuthSession();

  if (session?.user) redirect("/dashboard");

  return (
    <div className="max-w-md mx-auto flex flex-col gap-8">
      <h1 className="text-center">Login Page</h1>

      <div className="border p-4 rounded-lg grid place-items-center gap-4">
        <CredentialsLoginForm />

        <p>OR</p>

        <LoginUsingProviders />
      </div>
    </div>
  );
};

export default LoginPage;
