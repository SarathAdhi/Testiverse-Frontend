import UseSearchParamsHandler from "@hooks/use-search-params-handler";
import axios from "@lib/axios";
import { TestimonialTypeMongo } from "@schemas/testimonialSchema";
import { Rating, ThinRoundedStar } from "@smastrom/react-rating";
import { Badge } from "@ui/badge";
import { Button } from "@ui/button";
import { cn } from "@utils/cn";
import dayjs from "dayjs";
import { Share2, Trash } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

type Props = {
  testimonials: TestimonialTypeMongo[];
  startUrl: string;
};

const TestimonialDataColumns = ({ testimonials = [], startUrl }: Props) => {
  const { refresh, push } = useRouter();
  const { modifySearchParams } = UseSearchParamsHandler();

  return (
    <div className="columns-1 lg:columns-2 xl:columns-3 space-y-4">
      {testimonials.map(
        ({ _id, type, rating, text, file, user, customFields, createdAt }) => (
          <div
            key={_id}
            onClick={() => modifySearchParams("id", _id)}
            className={cn(
              "cursor-pointer overflow-hidden w-full relative p-4 flex flex-col gap-4 bg-primary/[0.03] rounded-lg border duration-200 hover:bg-primary/[0.01]",
              type === "text"
                ? "border-purple-400 dark:border-purple-900/50"
                : "border-orange-400 dark:border-orange-900/50"
            )}
          >
            <div className="absolute top-4 right-4 flex items-center gap-2">
              <Button
                size="icon"
                variant="destructive"
                className="right-4 w-8 h-8 rounded-full"
                onClick={async (e) => {
                  e.stopPropagation();

                  await axios.delete("/testimonial/delete-many", {
                    data: [_id],
                  });

                  refresh();
                }}
              >
                <Trash className="w-4 h-4 stroke-white" />
              </Button>

              <Button
                size="icon"
                className="right-4 w-8 h-8 rounded-full"
                onClick={async (e) => {
                  e.stopPropagation();

                  // await axios.delete("/testimonial/delete-many", {
                  //   data: [_id],
                  // });

                  refresh();
                }}
              >
                <Share2 className="w-4 h-4 stroke-background" />
              </Button>
            </div>

            <Badge
              variant={type === "text" ? "purple" : "orange"}
              className="text-sm capitalize w-fit"
            >
              {type}
            </Badge>

            <div className="grid gap-2">
              <Rating
                className="max-w-40"
                value={parseInt(rating!)}
                itemStyles={{
                  itemShapes: ThinRoundedStar,
                  activeFillColor: "#f59e0b",
                  inactiveFillColor: "#ffedd5",
                }}
                readOnly
              />

              {type === "text" ? (
                <p className="line-clamp-4">{text}</p>
              ) : (
                <video className="w-full rounded-lg" controls>
                  <source src={file} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )}
            </div>

            {user && (
              <div className="grid gap-2">
                <p className="font-semibold">User Details</p>

                <div className="flex-shrink-0 flex items-center gap-2">
                  {user?.image && (
                    <div>
                      <Image
                        width={100}
                        height={100}
                        className="flex-shrink-0 w-12 h-12 rounded-full"
                        src={user.image}
                        alt={user.name}
                        draggable={false}
                      />
                    </div>
                  )}

                  <div className="grid gap-1">
                    <p className="font-medium leading-none">{user?.name}</p>

                    <a
                      className="text-sm leading-none underline"
                      href={`mailto:${user?.email}`}
                    >
                      {user?.email}
                    </a>
                  </div>
                </div>
              </div>
            )}

            <div className="grid">
              <span>Created At:</span>{" "}
              <span>{dayjs(createdAt).format("MMM DD, YYYY, hh:mm A")}</span>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default TestimonialDataColumns;
