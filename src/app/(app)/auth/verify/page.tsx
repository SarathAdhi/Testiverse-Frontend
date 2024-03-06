import { redirect } from "next/navigation";

type Props = {
  searchParams: {
    token?: string;
    error?: string;
  };
};

const AuthPage = ({ searchParams }: Props) => {
  const error = searchParams?.error;

  if (!error) redirect("/dashboard");

  return (
    <div>
      <p>{error}</p>
    </div>
  );
};

export default AuthPage;
