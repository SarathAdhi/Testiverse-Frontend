import { fetchUser } from "@lib/fetch-user";
import Link from "next/link";
import ActionButton from "./action-button";

const Navbar = async ({ isShowcasePage = false }) => {
  const user = await fetchUser();

  return (
    <header className="z-50 sticky top-0 bg-background border-b">
      <div className="container pd flex items-center justify-between">
        <Link href="/">
          <h4>Testiverse</h4>
        </Link>

        {!isShowcasePage && (
          <>
            <ActionButton user={user} />
          </>
        )}
      </div>
    </header>
  );
};

export default Navbar;
