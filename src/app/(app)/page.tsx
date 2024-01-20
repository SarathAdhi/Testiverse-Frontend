import { Button } from "@ui/button";
import { getServerSession } from "next-auth";

export default async function Home() {
  const session = await getServerSession();

  // console.log({ session });

  return (
    <div className="space-y-4">
      <h1>Home page</h1>

      <div>
        <p>{session?.user.name}</p>
        <p>{session?.user.email}</p>
        <p>{session?.user.id}</p>
      </div>

      <Button>Button</Button>
    </div>
  );
}
