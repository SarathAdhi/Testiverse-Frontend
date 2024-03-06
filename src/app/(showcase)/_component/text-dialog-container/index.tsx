"use client";

import { useDialogHandler } from "@hooks/use-dialog-handler";
import { ShowcaseType } from "@schemas/showcaseSchema";
import { Button } from "@ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@ui/dialog";
import { Pencil } from "lucide-react";
import TextSubmitForm from "./text-submit-form";

type Props = {
  collectStarRating: boolean;
  customFields: ShowcaseType["customFields"];
  showcase: string;
  textBtn: ShowcaseType["buttonData"]["text"];
  questions: ShowcaseType["questions"];
};

const TextDialogContainer = ({
  textBtn,
  collectStarRating,
  customFields,
  showcase,
  questions,
}: Props) => {
  const { isDialogOpen, onOpenChange, onOpen, onClose } = useDialogHandler();

  return (
    <>
      <Button
        style={{
          backgroundColor: textBtn.bgColor,
          color: textBtn.color,
        }}
        size="lg"
        className="rounded-full border hover:opacity-90"
        onClick={onOpen}
      >
        <Pencil className="mr-2 w-5 h-5" color={textBtn.color} />
        {textBtn.label}
      </Button>

      <Dialog open={isDialogOpen} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-3xl overflow-auto max-h-[90svh] text-center space-y-4">
          <div className="grid place-items-center text-center gap-2">
            <Pencil className="w-12 h-12 stroke-purple-500 bg-gray-800 p-3 rounded-full" />

            <DialogTitle className="text-2xl">
              Write text testimonial
            </DialogTitle>
          </div>

          <DialogDescription className="border-b pb-6">
            <div className="text-center space-y-4">
              <div className="flex flex-col items-center">
                <h5>Questions</h5>

                <hr className="w-8 rounded-full bg-foreground h-1" />
              </div>

              <ol className="list-decimal list-inside">
                {questions.map(({ id, question }) => (
                  <li className="text-base" key={id}>
                    {question}
                  </li>
                ))}
              </ol>
            </div>
          </DialogDescription>

          <div>
            <TextSubmitForm
              {...{ collectStarRating, customFields, showcase, onClose }}
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TextDialogContainer;
