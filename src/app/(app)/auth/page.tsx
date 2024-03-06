import { fetchUser } from "@lib/fetch-user";
import { Button } from "@ui/button";
import { endpoints } from "@utils/endpoints";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

type Props = {
  searchParams: {
    error?: string;
    type?: string;
  };
};

const LoginPage = async ({ searchParams }: Props) => {
  const user = await fetchUser();

  if (user) redirect("/dashboard");

  const isSignIn = searchParams?.type === "signin";
  const error = searchParams?.error;

  return (
    <div className="w-full h-full flex-1 flex justify-center items-center">
      <div className="-mt-40 w-full max-w-3xl mx-auto grid gap-8">
        <h1 className="text-center">
          {isSignIn ? "Welcome back to Testiverse" : "Let's get Started"}
        </h1>

        <div className="w-full max-w-sm mx-auto grid gap-4">
          <Button variant="outline" size="lg" asChild>
            <a href={endpoints.auth.google.login}>
              <Image
                className="w-5 h-5 mr-2"
                width={50}
                height={50}
                src="/assets/auth/google-icon.svg"
                alt="Google"
                draggable={false}
              />
              Google
            </a>
          </Button>

          <div className="flex items-center gap-4">
            <hr className="flex-1" />
            <p>or</p>
            <hr className="flex-1" />
          </div>

          <Button size="lg" asChild>
            <a href={endpoints.auth.github.login}>
              <Image
                className="w-5 h-5 mr-2 hidden dark:block"
                width={50}
                height={50}
                src="/assets/auth/github-icon-dark.svg"
                alt="GitHub"
                draggable={false}
              />
              <Image
                className="w-5 h-5 mr-2 block dark:hidden"
                width={50}
                height={50}
                src="/assets/auth/github-icon-light.svg"
                alt="GitHub"
                draggable={false}
              />
              GitHub
            </a>
          </Button>

          <div className="mt-4 grid place-content-center place-items-center">
            <p>{isSignIn ? "New to Testiverse?" : "Already a member"}</p>
            <Link
              className="text-blue-500"
              href={`/auth${isSignIn ? "" : "?type=signin"}`}
            >
              {isSignIn ? "Sign Up" : "Sign In"}
            </Link>
          </div>
        </div>

        {error && (
          <p className="text-center text-red-500 font-medium">{error}</p>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
