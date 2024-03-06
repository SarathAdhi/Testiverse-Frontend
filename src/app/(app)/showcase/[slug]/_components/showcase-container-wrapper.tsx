"use client";

import { Badge } from "@ui/badge";
import { Button } from "@ui/button";
import { frontendUrl } from "@utils/constants";
import { Pencil } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ReactNode, useState } from "react";
import ShowcaseSidebar from "./showcase-sidebar";

const ShowcaseContainerWrapper = ({
  isDarkTheme,
  name,
  slug,
  children,
}: {
  isDarkTheme: boolean;
  name: string;
  slug: string;
  children: ReactNode;
}) => {
  const searchParams = useSearchParams();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="w-full">
      <div className="border-b">
        <section className="grid gap-4">
          <div>
            <Badge className="mb-2">
              {isDarkTheme ? "Dark" : "Light"} {" theme"}
            </Badge>

            <h3>{name}</h3>

            <div>
              <span>
                Showcase public URL:{" "}
                <Link href={`/${slug}`} className="underline" target="_blank">
                  {frontendUrl + `/${slug}`}
                </Link>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button size="icon" className="rounded-full" asChild>
              <Link href={`/showcase/${slug}/edit`}>
                <Pencil className="w-5 h-5 stroke-background" />
              </Link>
            </Button>
          </div>
        </section>
      </div>

      <section className="p-0 w-full relative flex items-start gap-8">
        <ShowcaseSidebar
          {...{
            type: searchParams.get("type")!,
            isSidebarOpen,
            setIsSidebarOpen,
          }}
        />

        <div className="w-full h-[200vh] flex flex-col gap-0.5">{children}</div>
      </section>
    </div>
  );
};

export default ShowcaseContainerWrapper;
