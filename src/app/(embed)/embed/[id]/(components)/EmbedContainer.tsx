"use client";

import { TestimonialTypeMongo } from "@schemas/testimonialSchema";
import { Rating, ThinRoundedStar } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { cn } from "@utils/cn";
import Image from "next/image";
import { useEffect } from "react";

type Props = {
  id: string;
  searchParams: {
    theme?: string;
  };
  testimonials: TestimonialTypeMongo[];
};

const EmbedContainer = ({ id, searchParams, testimonials }: Props) => {
  const theme = searchParams?.theme || "light";

  useEffect(() => {
    // Send a postMessage to the parent window with the content height
    const sendHeightToParent = () => {
      const contentHeight = document.body.scrollHeight;
      window.parent.postMessage(
        { type: "embedHeight", height: contentHeight },
        "*"
      );
    };

    sendHeightToParent();

    window.addEventListener("resize", sendHeightToParent);

    return () => {
      window.removeEventListener("resize", sendHeightToParent);
    };
  }, []);

  return (
    <section>
      <div className="grid gap-4 p-2">
        <div className="sm:columns-2 lg:columns-3 space-y-4">
          {testimonials.map(
            ({
              _id,
              type,
              rating,
              text,
              file,
              user,
              customFields,
              createdAt,
            }) => (
              <div
                key={_id}
                className={cn(
                  "overflow-hidden w-full relative p-4 flex flex-col gap-4 border rounded-lg duration-200 hover:bg-primary/[0.05]"
                )}
              >
                {user && (
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

                      {/* <a
                        className="text-sm leading-none underline"
                        href={`mailto:${user?.email}`}
                      >
                        {user?.email}
                      </a> */}
                    </div>
                  </div>
                )}

                <div className="grid gap-2">
                  <Rating
                    className="max-w-40"
                    value={parseInt(rating!)}
                    itemStyles={{
                      itemShapes: ThinRoundedStar,
                      activeFillColor: "#f59e0b",
                      inactiveFillColor: "#ffedd5",
                      inactiveStrokeColor: "#f59e0b",
                      itemStrokeWidth: 1,
                    }}
                    readOnly
                  />

                  {type === "text" ? (
                    <p>{text}</p>
                  ) : (
                    <video className="w-full rounded-lg" controls>
                      <source src={file} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  )}
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default EmbedContainer;
