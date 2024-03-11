"use client";

import UseSearchParamsHandler from "@hooks/use-search-params-handler";
import { Button } from "@ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@ui/dropdown-menu";
import { Input } from "@ui/input";
import { cn } from "@utils/cn";
import { PanelRightOpen } from "lucide-react";

type Props = {
  view: string;
  setIsSidebarOpen: (value: boolean) => void;
  isSidebarOpen: boolean;
};

const TopActionItems = ({
  view = "columns",
  isSidebarOpen,
  setIsSidebarOpen,
}: Props) => {
  const { modifySearchParams } = UseSearchParamsHandler();

  return (
    <div className="py-4 bg-background z-40 sticky top-[55px] sm:top-[72px] flex items-center gap-2 sm:gap-4">
      <Button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        variant="ghost"
        className="flex md:hidden p-1 w-10 h-10 rounded-full !scale-100 flex-shrink-0"
      >
        <PanelRightOpen
          className={cn(
            "w-5 h-5 duration-200 transition-transform ease-in-out",
            !isSidebarOpen ? "rotate-0" : "rotate-180"
          )}
        />
      </Button>

      <Input
        className="w-full rounded-full"
        placeholder="Search here"
        onChange={(e) => modifySearchParams("search", e.target.value)}
      />

      <div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="rounded-full">
              View
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="w-36" align="end">
            <DropdownMenuLabel>View Types</DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuRadioGroup
              value={view}
              onValueChange={(value) => modifySearchParams("view", value)}
            >
              <DropdownMenuRadioItem value="columns">
                Columns
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="table">Table</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default TopActionItems;
