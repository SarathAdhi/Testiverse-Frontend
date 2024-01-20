import React from "react";
import CredentialsRegisterForm from "./(components)/credentials-register-form";
import { getServerAuthSession } from "@lib/auth-options";
import { redirect } from "next/navigation";
import { getProviders } from "next-auth/react";
import LoginUsingProviders from "../login/(components)/login-using-providers";

const RegisterPage = async () => {
  const session = await getServerAuthSession();

  const providers = await getProviders();

  console.log(providers);

  if (session?.user) redirect("/dashboard");

  return (
    <div className="max-w-md mx-auto flex flex-col gap-8">
      <h1 className="text-center">Register Page</h1>

      <div className="border p-4 rounded-lg grid place-items-center gap-4">
        <CredentialsRegisterForm />

        <p>OR</p>

        <LoginUsingProviders />
      </div>
    </div>
  );
};

export default RegisterPage;
