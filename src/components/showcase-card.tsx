"use client";

import { Card, CardFooter, CardHeader, CardTitle } from "@ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@ui/popover";

import { Close } from "@radix-ui/react-popover";
import { ShowcaseTypeMongo } from "@schemas/showcaseSchema";
import { Button } from "@ui/button";
import { deleteShowcase } from "app/actions";
import { Pencil, ScrollText, Trash, Video } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import MarkdownJSX from "./markdown-jsx";

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
    <Card
      className="relative duration-150 hover:scale-[1.02] ease-in-out active:scale-[0.98] cursor-pointer select-none"
      onClick={() => {
        push(`/showcase/${slug}`);
      }}
    >
      <CardHeader className="">
        <CardTitle>{name}</CardTitle>

        <div className="line-clamp-2">
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

      {/* <CardContent><p>Card Content</p></CardContent> */}

      <CardFooter className="grid grid-cols-2 gap-2">
        <Button onClick={(e) => e.stopPropagation()} asChild>
          <Link href={`/showcase/${slug}/edit`}>
            <Pencil className="stroke-background w-4 h-4 mr-2" />
            Edit
          </Link>
        </Button>

        <Popover>
          <PopoverTrigger onClick={(e) => e.stopPropagation()} asChild>
            <Button variant="destructive">
              <Trash className="stroke-white w-4 h-4 mr-2" />
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
