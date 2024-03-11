"use client";

import { TestimonialTypeMongo } from "@schemas/testimonialSchema";

import UseSearchParamsHandler from "@hooks/use-search-params-handler";
import axios from "@lib/axios";
import { Rating, ThinRoundedStar } from "@smastrom/react-rating";
import { Button } from "@ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@ui/drawer";
import { Label } from "@ui/label";
import dayjs from "dayjs";
import { Trash } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import TestimonialDataColumns from "./testimonial-data-columns";
import TestimonialDataTable from "./testimonial-data-table";
import TopActionItems from "./top-action-items";

type Props = {
  type: string;
  view: string;
  testimonials: TestimonialTypeMongo[];
  testimonial: TestimonialTypeMongo | undefined;
  isDrawerOpened: boolean;
  startUrl: string;
};

const TestimonialContainer = ({
  type,
  view,
  testimonials,
  startUrl,
  isDrawerOpened,
  testimonial,
}: Props) => {
  const { modifySearchParams } = UseSearchParamsHandler();
  const { refresh } = useRouter();

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <>
      <TopActionItems
        {...{
          view,
          setIsSidebarOpen,
          isSidebarOpen,
        }}
      />

      <div className="p-2 sm:p-4 !pt-0">
        {(!testimonials || testimonials.length === 0) && (
          <div className="select-none grid text-center">
            <Image
              width={500}
              height={500}
              className="mx-auto w-64 h-64"
              src="/assets/dashboard/empty-illustration.png"
              alt="Empty Illustration"
              draggable={false}
            />

            <p>No Testimonials</p>
          </div>
        )}

        {testimonials && testimonials.length > 0 && view === "table" ? (
          <TestimonialDataTable data={testimonials} />
        ) : (
          <TestimonialDataColumns {...{ testimonials, startUrl }} />
        )}
      </div>

      <Drawer
        open={isDrawerOpened}
        onOpenChange={(value) => !value && modifySearchParams("id", "")}
      >
        <DrawerContent className="max-h-[90svh] text-center mx-auto max-w-[900px]">
          <DrawerHeader>
            <DrawerTitle className="text-center text-3xl sm:text-4xl">
              Testimonial
            </DrawerTitle>

            <DrawerDescription className="text-center capitalize text-lg">
              Testimonial type: {testimonial?.type}
            </DrawerDescription>

            <span className="text-center">
              Created At:{" "}
              {dayjs(testimonial?.createdAt).format("MMM DD, YYYY, hh:mm A")}
            </span>
          </DrawerHeader>

          <div className="overflow-auto p-6 flex flex-col items-center gap-6">
            <Button
              variant="destructive"
              onClick={async () => {
                await axios.delete("/testimonial/delete-many", {
                  data: [testimonial?._id],
                });

                refresh();

                modifySearchParams("id", "");
              }}
            >
              <Trash className="w-4 h-4 stroke-white mr-2" /> Delete Testimonial
            </Button>

            {testimonial?.user && (
              <div className="grid gap-2 place-content-center text-center">
                <p className="font-semibold">User Details</p>

                <div className="flex-shrink-0 flex flex-col items-center gap-2">
                  {testimonial?.user?.image && (
                    <div>
                      <Image
                        width={200}
                        height={200}
                        className="flex-shrink-0 w-20 h-20 rounded-full"
                        src={testimonial?.user.image}
                        alt={testimonial?.user.name}
                        draggable={false}
                      />
                    </div>
                  )}

                  <div className="flex flex-col items-center gap-1">
                    <h4 className="font-medium leading-none">
                      {testimonial?.user?.name}
                    </h4>

                    <a
                      className="leading-none underline"
                      href={`mailto:${testimonial?.user?.email}`}
                    >
                      {testimonial?.user?.email}
                    </a>
                  </div>
                </div>
              </div>
            )}

            <div className="flex flex-col items-center gap-6">
              <Rating
                className="max-w-40"
                value={parseInt(testimonial?.rating!)}
                itemStyles={{
                  itemShapes: ThinRoundedStar,
                  activeFillColor: "#f59e0b",
                  inactiveFillColor: "#ffedd5",
                  inactiveStrokeColor: "#f59e0b",
                }}
                readOnly
              />

              {testimonial?.type === "text" ? (
                <p>{testimonial?.text}</p>
              ) : (
                <video className="w-full rounded-lg" controls>
                  <source src={testimonial?.file} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )}

              <div className="grid gap-2">
                <h5 className="underline">Custom Fields</h5>

                {testimonial?.customFields.map((field) => (
                  <div key={field?.id}>
                    <Label className="font-semibold text-lg">
                      {field?.name}
                    </Label>
                    <p>{field?.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default TestimonialContainer;
