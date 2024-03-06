"use client";

import { DataTable } from "@components/data-table";
import UseSearchParamsHandler from "@hooks/use-search-params-handler";
import axios from "@lib/axios";
import { TestimonialTypeMongo } from "@schemas/testimonialSchema";
import { Rating, ThinRoundedStar } from "@smastrom/react-rating";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@ui/button";
import { Checkbox } from "@ui/checkbox";
import dayjs from "dayjs";
import { ArrowUpDown, Trash2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

type Props = {
  data: TestimonialTypeMongo[];
};

const TestimonialDataTable = ({ data = [] }: Props) => {
  const { refresh } = useRouter();

  const { modifySearchParams } = UseSearchParamsHandler();

  const columns: ColumnDef<TestimonialTypeMongo>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "action",
      header: "",
      cell: ({ row }) => (
        <Button
          size="sm"
          onClick={() => modifySearchParams("id", row.original._id)}
        >
          View
        </Button>
      ),
    },
    {
      accessorKey: "type",
      header: "Type",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("type")}</div>
      ),
    },
    {
      accessorKey: "person",
      header: "Person",
      cell: ({ row }) => {
        const user = row.original?.user;

        return (
          <div className="flex items-center gap-2 flex-shrink-0">
            {user?.image && (
              <div>
                <Image
                  width={100}
                  height={100}
                  className="w-12 h-12 rounded-full flex-shrink-0"
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
        );
      },
    },
    {
      accessorKey: "testimonial",
      header: "Testimonial",
      cell: ({ row }) => {
        const type = row.original.type;
        const rating = row.original?.rating;
        const text = row.original?.text;
        const file = row.original?.file;

        return (
          <div className="grid gap-2">
            <Rating
              className="max-w-28"
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
              <p className="w-full max-w-60 truncate">{text}</p>
            ) : (
              <video className="w-full max-w-60 rounded-lg" controls>
                <source src={file} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
          </div>
        );
      },
    },
    {
      accessorKey: "createdAt",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Created At
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <span>
          {dayjs(row.getValue("createdAt")).format("MMM DD, YYYY, hh:mm A")}
        </span>
      ),
    },
  ];

  return (
    <div>
      <DataTable
        TopActionButtons={(table) => {
          const selectedRows = table.getSelectedRowModel().rows;

          return (
            <div className="flex items-center">
              {selectedRows.length > 0 && (
                <Button
                  variant="destructive"
                  onClick={async () => {
                    const testimonialIds = selectedRows.map(
                      ({ original }) => original._id
                    );

                    await axios.delete("/testimonial/delete-many", {
                      data: testimonialIds,
                    });

                    table.resetRowSelection();

                    refresh();
                  }}
                >
                  <Trash2 className="stroke-white w-5 h-5 mr-1" />
                  Delete
                </Button>
              )}
            </div>
          );
        }}
        columns={columns}
        data={data}
      />
    </div>
  );
};

export default TestimonialDataTable;
