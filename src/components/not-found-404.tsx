import { fetchUser } from "@lib/fetch-user";
import { Button } from "@ui/button";
import Image from "next/image";
import Link from "next/link";

const NotFoundPage = async ({ reason }: { reason?: string }) => {
  const user = await fetchUser();

  console.log({ reason });

  return (
    <div className="flex-1 grid place-content-center">
      <div className="grid place-content-center place-items-center gap-8">
        <Image
          width={1000}
          height={1000}
          className="max-w-[500px]"
          src="/404.png"
          alt="Not Found"
          draggable={false}
        />

        <div className="space-y-2 text-center">
          <h4>Page Not Found</h4>
          {reason && <p className="text-destructive font-medium">{reason}</p>}
        </div>

        <Button asChild>
          <Link href={user ? "/dashboard" : "/"}>
            Go back to {user ? "Dashboard" : "Home"}
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFoundPage;
