"use client";

import { cn } from "@utils/cn";
import { testimonials } from "data/testimonials";
import React, { useEffect } from "react";

type Props = {
  id: string;
  searchParams: {
    theme?: string;
  };
};

const EmbedContainer = ({ id, searchParams }: Props) => {
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
    <section className={theme}>
      <div className="grid gap-4 p-2 dark:bg-black dark:text-white">
        <h1>ID: {id}</h1>

        <div className="sm:columns-2 lg:columns-3 space-y-4">
          {testimonials.map(({ user, source, testimonial }, index) => (
            <div
              key={index}
              className="grid gap-4 rounded-lg border dark:border-gray-600 p-4 overflow-hidden shadow-lg dark:shadow-md dark:shadow-gray-900"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-2">
                  <img className="w-10 h-10 rounded-full" src={user.image} />

                  <div>
                    <h5>{user.name}</h5>
                    <p className="lowercase">@{user.name.replace(" ", "")}</p>
                  </div>
                </div>

                <p>
                  {source === "twitter" && (
                    <img
                      className="w-6 h-6 rounded-full"
                      src="https://static.vecteezy.com/system/resources/previews/016/716/467/non_2x/twitter-icon-free-png.png"
                    />
                  )}
                </p>
              </div>

              <div className="grid gap-4">
                <p className="whitespace-pre-wrap">{testimonial.content}</p>

                {testimonial.images && (
                  <img src={testimonial.images} className="rounded-lg" />
                )}

                <p className="text-gray-500 dark:text-gray-400 font-medium">
                  {testimonial.date}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EmbedContainer;
