"use client";

import axios from "@lib/axios";
import { ShowcaseType } from "@schemas/showcaseSchema";
import { Button } from "@ui/button";
import { DialogDescription, DialogHeader, DialogTitle } from "@ui/dialog";
import { Form } from "@ui/form";
import { InputFormField } from "@ui/input/input-form-field";
import StarRating from "@ui/star-rating";
import { Video } from "lucide-react";
import Image from "next/image";
import { useFieldArray, useForm } from "react-hook-form";
import toast from "react-hot-toast";

type Props = {
  videoSrc: string;
  collectStarRating: boolean;
  customFields: ShowcaseType["customFields"];
  handleDeleteVideo: () => void;
  file: Blob | undefined;
  showcase: string;
  onClose: () => void;
};

type DefaultValueProps = {
  customFields: ({
    value: string | number | URL;
  } & ShowcaseType["customFields"][0])[];
  user: {
    name: string;
    email: string;
    image?: File;
  };
  rating?: number;
};

const VideoSubmitForm = ({
  videoSrc,
  handleDeleteVideo,
  file,
  collectStarRating,
  customFields,
  showcase,
  onClose,
}: Props) => {
  let defaultValues: DefaultValueProps = {
    customFields: customFields.map((field) => ({ ...field, value: "" })),
    user: {
      name: "",
      email: "",
      image: undefined,
    },
  };

  if (collectStarRating) defaultValues["rating"] = 0;

  const form = useForm({
    defaultValues,
  });

  const { fields } = useFieldArray<DefaultValueProps>({
    control: form.control,
    name: "customFields",
  });

  async function handleVideoSubmit(values: DefaultValueProps) {
    if (!file) return toast.error("Video file not found");

    try {
      const formData = new FormData();

      if (values.user.image) formData.append("user_image", values.user.image);

      formData.append("video", file);

      formData.append(
        "json",
        JSON.stringify({
          ...values,
          type: "video",
          showcase,
        })
      );

      await axios.post(`/testimonial`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      onClose();
      handleDeleteVideo();
    } catch (error) {}
  }

  return (
    <DialogHeader className="space-y-4">
      <div className="grid place-items-center text-center gap-2">
        <Video className="w-14 h-14 stroke-purple-500 bg-gray-800 p-3 rounded-full" />
        <DialogTitle>
          {file ? "Review your video" : "Check Your Camera and Microphone?"}
        </DialogTitle>

        <DialogDescription>
          {file
            ? "Please fill out all the required fields to proceed."
            : `You are allotted a maximum of 120 seconds for video recording. Rest
            assured, you can preview your video before finalizing the
            submission, and if necessary, you have the option to re-record.`}
        </DialogDescription>
      </div>

      <div className="space-y-4">
        <video className="w-full" controls>
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleVideoSubmit)}
            className="w-full space-y-6"
          >
            <div className="flex items-center gap-4">
              {form.watch("user.image") ? (
                <Image
                  width={500}
                  height={500}
                  className="flex-shrink-0 w-14 h-14 rounded-full object-contain"
                  src={URL.createObjectURL(form.watch("user.image") as File)}
                  alt={"Showcase image"}
                  draggable={false}
                />
              ) : (
                <div className="flex-shrink-0 w-14 h-14 rounded-full object-contain bg-gray-500" />
              )}

              <InputFormField type="file" name="user.image" />
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <InputFormField
                label="Your Email"
                name="user.email"
                type="email"
                required
              />

              <InputFormField label="Your Name" name="user.name" required />
            </div>

            {collectStarRating && (
              <StarRating
                label={`Rating (${form.watch("rating")})`}
                name="rating"
              />
            )}

            {fields.map(({ id, type, name }, i) => (
              <InputFormField
                label={name}
                key={id}
                name={`customFields.${i}.value`}
                type={type}
                required
              />
            ))}

            <div className="grid grid-cols-2 gap-4">
              <Button
                type="button"
                onClick={handleDeleteVideo}
                variant="outline"
              >
                Record again
              </Button>

              <Button disabled={form.formState.isSubmitting}>
                Confirm to Send
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </DialogHeader>
  );
};

export default VideoSubmitForm;
