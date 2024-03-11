"use client";

import { Card, CardFooter, CardHeader, CardTitle } from "@ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@ui/popover";

import { Close } from "@radix-ui/react-popover";
import { ShowcaseTypeMongo } from "@schemas/showcaseSchema";
import { Button } from "@ui/button";
import { deleteShowcase } from "app/actions";
import {
  CogIcon,
  MoreVertical,
  Pencil,
  ScrollText,
  Trash,
  Video,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import MarkdownJSX from "./markdown-jsx";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@ui/dropdown-menu";

type Props = ShowcaseTypeMongo & {
  testimonialCounts: {
    type: string;
    count: number;
  }[];
};

const ShowcaseCard = ({
  _id,
  name,
  message,
  slug,
  testimonialCounts,
}: Props) => {
  const { refresh, push } = useRouter();

  const videoTestimonialCount = testimonialCounts.find(
    ({ type }) => type === "video"
  )?.count;
  const textTestimonialCount = testimonialCounts.find(
    ({ type }) => type === "text"
  )?.count;

  return (
    <Card className="relative select-none">
      <CardHeader className="space-y-4">
        <div className="w-full flex items-center justify-between gap-4">
          <CardTitle>{name}</CardTitle>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                size="icon"
                variant="outline"
                className="size-8 rounded-full"
              >
                <MoreVertical className="stroke-foreground size-5" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent sideOffset={8} align="end">
              <DropdownMenuItem
                onClick={() => {
                  navigator.clipboard
                    .writeText(`${window.location.origin}/showcase/${slug}`)
                    .then(() => toast.success("Link Copied to Clipboard"));
                }}
              >
                Get Link
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="line-clamp-2 [&_p]:!leading-none">
          <MarkdownJSX>{message}</MarkdownJSX>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex  items-center gap-1">
            <ScrollText className="w-5 h-5" />

            <p>{textTestimonialCount || 0}</p>
          </div>

          <div className="flex  items-center gap-1">
            <Video className="w-5 h-5" />

            <p>{videoTestimonialCount || 0}</p>
          </div>
        </div>
      </CardHeader>

      <CardFooter className="grid grid-cols-3 gap-2">
        <Button onClick={(e) => e.stopPropagation()} asChild>
          <Link href={`/showcase/${slug}`}>
            <CogIcon className="stroke-background size-4 mr-2 flex-shrink-0" />
            Manage
          </Link>
        </Button>

        <Button
          variant="secondary"
          onClick={(e) => e.stopPropagation()}
          asChild
        >
          <Link href={`/showcase/${slug}/edit`}>
            <Pencil className="size-4 mr-2 flex-shrink-0" />
            Edit
          </Link>
        </Button>

        <Popover>
          <PopoverTrigger onClick={(e) => e.stopPropagation()} asChild>
            <Button variant="destructive">
              <Trash className="stroke-white size-4 mr-2 flex-shrink-0" />
              Delete
            </Button>
          </PopoverTrigger>

          <PopoverContent
            onClick={(e) => e.stopPropagation()}
            className="space-y-4"
          >
            <p>
              Are you sure you want to delete <strong>{name}</strong> showcase?
            </p>

            <div className="grid grid-cols-2 gap-4">
              <Button
                onClick={(e) => e.stopPropagation()}
                variant="outline"
                asChild
              >
                <Close>Close</Close>
              </Button>

              <Button
                onClick={async (e) => {
                  e.stopPropagation();

                  const { message, error } = await deleteShowcase(_id);

                  if (message) toast.success(message);
                  else if (error) toast.error(error);

                  refresh();
                }}
              >
                Yes
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </CardFooter>
    </Card>
  );
};

export default ShowcaseCard;
