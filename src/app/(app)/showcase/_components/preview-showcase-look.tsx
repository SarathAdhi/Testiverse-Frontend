import MarkdownJSX from "@components/markdown-jsx";
import { ShowcaseType } from "@schemas/showcaseSchema";
import { Badge } from "@ui/badge";
import { Button } from "@ui/button";
import { Input } from "@ui/input";
import { cn } from "@utils/cn";
import { frontendUrl } from "@utils/constants";
import { removeSpecialCharacters } from "@utils/helper-functions";
import {
  ArrowLeftCircle,
  ArrowRightCircle,
  Pencil,
  RotateCw,
  Video,
} from "lucide-react";
import { UseFormWatch } from "react-hook-form";

type Props = {
  watch: UseFormWatch<ShowcaseType>;
};

const PreviewShowcaseLook = ({ watch }: Props) => {
  return (
    <div className="lg:sticky lg:top-[105px] w-full space-y-2">
      <Badge className="text-sm group">
        <span
          color="black"
          className="w-2 h-2 rounded-full group-hover:animate-none animate-ping bg-green-500 mr-1.5"
        />
        Live Preview
      </Badge>

      <div
        className={cn(
          watch("isDarkTheme") ? "dark" : "light",
          "bg-background rounded-lg overflow-hidden border"
        )}
      >
        <div className="px-4 py-2 flex items-center gap-4 border-b">
          <div className="flex items-center gap-2">
            <ArrowLeftCircle className="w-5 h-5" />

            <ArrowRightCircle className="w-5 h-5 opacity-50" />

            <RotateCw className="ml-2 w-5 h-5" />
          </div>

          <Input
            className="text-xs rounded-full h-8 !outline-none !ring-transparent ring-offset-0"
            value={`${frontendUrl}/${
              removeSpecialCharacters(watch("name")) || "your-showcase"
            }`}
            readOnly
          />

          <div className="flex items-center gap-2">
            <span className="w-4 h-4 rounded-full bg-foreground" />
            <span className="w-4 h-4 rounded-full bg-foreground" />
          </div>
        </div>

        <div className="p-8 space-y-8">
          <div className="text-center space-y-1">
            <h2>{watch("headerTitle") || "Header comes here"}</h2>

            <MarkdownJSX>
              {watch("message") || "Your message comes here"}
            </MarkdownJSX>
          </div>

          <div className="text-center space-y-4">
            <div className="flex flex-col items-center">
              <h4>Questions</h4>

              <hr className="w-8 rounded-full bg-foreground h-1" />
            </div>

            <ol className="list-decimal list-inside">
              {watch("questions").map(({ id, question }) => (
                <li key={id}>{question}</li>
              ))}
            </ol>
          </div>

          <div className="grid gap-2">
            {watch("collection").includes("video") && (
              <Button
                style={{
                  backgroundColor: watch("buttonData.video.bgColor"),
                  color: watch("buttonData.video.color"),
                }}
                size="lg"
                className="rounded-full border"
              >
                <Video
                  className="flex-shrink-0 mr-2 w-5 h-5"
                  color={watch("buttonData.video.color")}
                />
                {watch("buttonData.video.label")}
              </Button>
            )}

            {watch("collection").includes("text") && (
              <Button
                style={{
                  backgroundColor: watch("buttonData.text.bgColor"),
                  color: watch("buttonData.text.color"),
                }}
                size="lg"
                className="rounded-full border"
              >
                <Pencil
                  color={watch("buttonData.text.color")}
                  className="flex-shrink-0 mr-2 w-5 h-5"
                />
                {watch("buttonData.text.label")}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewShowcaseLook;
