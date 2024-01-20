import React from "react";
import CredentialsLoginForm from "./(components)/credentials-login-form";
import { getServerAuthSession } from "@lib/auth-options";
import { redirect } from "next/navigation";

const LoginPage = async () => {
  const session = await getServerAuthSession();

  if (session?.user) redirect("/dashboard");

  return (
    <div className="grid gap-4">
      <h1>Login Page</h1>

      <div>
        <CredentialsLoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
