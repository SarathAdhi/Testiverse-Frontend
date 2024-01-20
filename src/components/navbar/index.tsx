import React from "react";
import ActionButton from "./action-button";
import { getServerSession } from "next-auth";

const Navbar = async () => {
  const session = await getServerSession();

  return (
    <header className="sticky top-0 py-4 flex items-center justify-between">
      <h3>Testiverse</h3>

      <ActionButton user={session?.user} />
    </header>
  );
};

export default Navbar;
