import MarkdownJSX from "@components/markdown-jsx";
import NotFoundPage from "@components/not-found-404";
import NextThemeProviders from "@components/theme-providers";
import { fetchFunc } from "@lib/fetch";
import { ShowcaseTypeMongo } from "@schemas/showcaseSchema";
import { Button } from "@ui/button";
import { cn } from "@utils/cn";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Toaster } from "react-hot-toast";
import TextDialogContainer from "../_component/text-dialog-container";
import VideoDialogContainer from "../_component/video-dialog-container";

type Props = {
  params: {
    slug: string;
  };
};

const ViewShowcasePage = async ({ params }: Props) => {
  const slug = params?.slug;

  let showcase: ShowcaseTypeMongo | null = null;
  let error = "";

  try {
    showcase = await fetchFunc.get(`/showcase/${slug}`, {
      cache: "no-store",
    });
  } catch (_error) {
    error = (_error as { message: string })?.message || (_error as string);
  }

  if (!showcase) return <NotFoundPage reason={error} />;

  const {
    _id,
    isDarkTheme,
    name,
    buttonData,
    image,
    collectStarRating,
    collection,
    customFields,
    headerTitle,
    message,
    questions,
  } = showcase;

  return (
    <NextThemeProviders forcedTheme={isDarkTheme ? "dark" : "light"}>
      <section className="flex-1 space-y-4 flex flex-col">
        <div
          className={cn(
            isDarkTheme ? "dark" : "light",
            "mt-10 mx-auto w-full h-fit max-w-3xl border rounded-3xl overflow-hidden p-4 sm:p-8 space-y-8"
          )}
        >
          <div className="text-center grid gap-4">
            <div className="mx-auto max-w-80">
              <Image
                width={1000}
                height={1000}
                className="aspect-square size-40 rounded-xl"
                src={image}
                alt={headerTitle}
                draggable={false}
              />
            </div>

            <h1>{headerTitle}</h1>

            <MarkdownJSX>{message}</MarkdownJSX>
          </div>

          <div className="text-center space-y-4">
            <div className="flex flex-col items-center">
              <h3>Questions</h3>

              <hr className="w-8 rounded-full bg-foreground h-1" />
            </div>

            <ol className="list-decimal list-inside">
              {questions.map(({ id, question }) => (
                <li className="text-lg" key={id}>
                  {question}
                </li>
              ))}
            </ol>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {collection.includes("video") && (
              <VideoDialogContainer
                {...{
                  collectStarRating,
                  customFields,
                  showcase: _id,
                  videoBtn: buttonData.video,
                }}
              />
            )}

            {collection.includes("text") && (
              <TextDialogContainer
                {...{
                  collectStarRating,
                  customFields,
                  showcase: _id,
                  textBtn: buttonData.text,
                  questions,
                }}
              />
            )}
          </div>
        </div>

        <div className="p-4 sm:p-8 w-full h-fit mx-auto max-w-3xl text-center border rounded-3xl grid gap-4 sm:gap-8">
          <h4>
            Want to create your own showcase to receive user testimonials?{" "}
            {"❤️"}
          </h4>

          <Button asChild className="mx-auto w-fit rounded-full">
            <Link href="/showcase/create" className="group">
              Create one for yourself
              <ArrowRight className="stroke-background w-5 h-5 ml-1 duration-200 ease-in-out transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </section>

      <Toaster position="top-center" reverseOrder={false} />
    </NextThemeProviders>
  );
};

export default ViewShowcasePage;
