"use client";

import { cn } from "@utils/cn";
import { Variants, motion } from "framer-motion";
import { HeartHandshake, PanelRightOpen } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const sidebarVariants: Variants = {
  hidden: {
    x: "-100%",
    transition: {
      ease: "easeInOut",
    },
  },
  visible: {
    x: 0,
    transition: {
      ease: "easeInOut",
    },
  },
};

const sideBarLinks = [
  {
    name: "Inbox",
    items: [
      {
        name: "All",
        key: "all",
        href: null,
        Icon: <div className="bg-gray-500 w-2 h-2 mr-2 rounded-full" />,
      },
      {
        name: "Text",
        key: "text",
        href: null,
        Icon: <div className="bg-purple-500 w-2 h-2 mr-2 rounded-full" />,
      },
      {
        name: "Video",
        key: "video",
        href: null,
        Icon: <div className="bg-orange-500 w-2 h-2 mr-2 rounded-full" />,
      },
    ],
  },
  {
    name: "EMBEDS",
    items: [
      {
        name: "Showcase Wall",
        key: "showcase-wall",
        href: "/showcase-wall",
        Icon: <HeartHandshake className="w-5 h-5 mr-2" />,
      },
    ],
  },
];

const ShowcaseSidebarNavlinks = ({
  handleTestimonialSearch,
  type,
  pathname,
}: {
  handleTestimonialSearch: (fieldValue: string, query: string) => void;
  type: string;
  pathname: string;
}) => (
  <div className="w-full">
    {sideBarLinks.map(({ name, items }) => (
      <div key={name} className="flex flex-col">
        <h6 className="p-2">{name}</h6>

        <div className="flex flex-col gap-2">
          {items.map(({ key, name, Icon, href }) =>
            href ? (
              <Link
                key={key}
                href={pathname + href}
                className={cn(
                  "py-2 px-4 hover:bg-foreground/10 rounded-lg flex items-center",
                  type === key && "bg-foreground/5 "
                )}
              >
                {Icon}
                {name}
              </Link>
            ) : (
              <button
                key={key}
                className={cn(
                  "py-2 px-4 hover:bg-foreground/10 rounded-lg flex items-center",
                  type === key && "bg-foreground/5 "
                )}
                onClick={() => handleTestimonialSearch("type", key)}
              >
                {Icon}
                {name}
              </button>
            )
          )}
        </div>
      </div>
    ))}
  </div>
);

type Props = {
  type: string;
  setIsSidebarOpen: (value: boolean) => void;
  isSidebarOpen: boolean;
};

const ShowcaseSidebar = ({
  type = "",
  isSidebarOpen = false,
  setIsSidebarOpen,
}: Props) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const { replace } = useRouter();

  function handleTestimonialSearch(fieldValue: string, query: string) {
    const params = new URLSearchParams(searchParams);

    if (query) params.set(fieldValue, query);
    else params.delete(fieldValue);

    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <>
      <aside className="p-4 sticky top-[73px] w-full max-w-60 hidden md:flex flex-col h-full flex-shrink-0">
        <ShowcaseSidebarNavlinks
          {...{ handleTestimonialSearch, type, pathname }}
        />
      </aside>

      <motion.aside
        initial="hidden"
        animate={isSidebarOpen ? "visible" : "hidden"}
        variants={sidebarVariants}
        transition={{ duration: 0.2 }}
        onMouseOutCapture={() => setIsSidebarOpen(false)}
        className="absolute top-0 left-0 z-50 w-full max-w-60 md:hidden h-full"
      >
        <div className="p-4 sticky top-[55px] bg-background flex flex-col items-end h-[calc(100vh-55px)]">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="absolute top-[26px] right-4"
          >
            <PanelRightOpen
              className={cn(
                "w-5 h-5 duration-200 transition-transform ease-in-out",
                !isSidebarOpen ? "rotate-0" : "rotate-180"
              )}
            />
          </button>

          <ShowcaseSidebarNavlinks
            {...{ handleTestimonialSearch, type, pathname }}
          />
        </div>
      </motion.aside>
    </>
  );
};

export default ShowcaseSidebar;
