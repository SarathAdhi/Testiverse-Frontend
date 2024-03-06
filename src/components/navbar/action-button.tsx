"use client";

import { Button } from "@ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@ui/dropdown-menu";
import { deleteCookie } from "cookies-next";
import Link from "next/link";

import { endpoints } from "@utils/endpoints";
import { LayoutDashboard, LogOut, User } from "lucide-react";
import Image from "next/image";
import type { User as UserType } from "types/user";
import ThemeButton from "./theme-button";

type Props = {
  user: UserType | null;
};

const ActionButton = ({ user }: Props) => {
  if (!user)
    return (
      <div className="flex items-center gap-4">
        <Button asChild>
          <Link href="/auth">Login</Link>
        </Button>

        <ThemeButton />
      </div>
    );

  return (
    <div className="flex items-center gap-4">
      <Button variant="ghost" className="hidden sm:flex" asChild>
        <Link href="/dashboard">Dashboard</Link>
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger className="rounded-full overflow-hidden">
          <div>
            <Image
              className="w-8 h-8 rounded-full"
              width={50}
              height={50}
              src={user.image}
              alt={user.name}
              draggable={false}
            />
          </div>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-40">
          <DropdownMenuItem asChild className="text-base">
            <Link
              href="/dashboard"
              className="cursor-pointer flex items-center"
            >
              <LayoutDashboard className="mr-2 w-5 h-5" />
              Dashboard
            </Link>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuGroup>
            <DropdownMenuItem className="text-base">
              <User className="mr-2 w-5 h-5" />
              Profile
            </DropdownMenuItem>
          </DropdownMenuGroup>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            onClick={() => {
              deleteCookie("bearer-token");
              window.open(endpoints.auth.logout, "_self");
            }}
            className="text-base cursor-pointer"
          >
            <LogOut className=" mr-2 h-5 w-5" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <ThemeButton />
    </div>
  );
};

export default ActionButton;
