"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import axios from "@lib/axios";
import {
  ShowcaseType,
  ShowcaseTypeMongo,
  showcaseFormSchema,
} from "@schemas/showcaseSchema";
import { Button } from "@ui/button";
import { Form } from "@ui/form";
import { InputFormField } from "@ui/input/input-form-field";
import { SelectFormField } from "@ui/select/select-form-field";
import { Switch } from "@ui/switch";
import { Textarea } from "@ui/textarea";
import { frontendUrl } from "@utils/constants";
import { removeSpecialCharacters } from "@utils/helper-functions";
import { PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import InputWithColorPicker from "./input-with-color-picker";
import PreviewShowcaseLook from "./preview-showcase-look";
// import QuestionsDnd from "./questions-dnd";
import dynamic from "next/dynamic";

const QuestionsDnd = dynamic(
  () => import("./questions-dnd").then((res) => res.default),
  { ssr: false }
);

const collectionTypeOptions = [
  {
    label: "Text and Video",
    value: "text-and-video",
  },
  {
    label: "Text only",
    value: "text-only",
  },
  {
    label: "Video only",
    value: "video-only",
  },
];

const fieldTypeOptions = [
  {
    label: "Text",
    value: "text",
  },
  {
    label: "Number",
    value: "number",
  },
  {
    label: "URL",
    value: "url",
  },
];

const _defaultValues: ShowcaseType = {
  name: "",
  image: "",
  headerTitle: "",
  message: "",
  questions: [
    {
      id: uuidv4(),
      question: "",
    },
  ],
  collection: "text-and-video",
  collectStarRating: false,
  customFields: [],
  isCustomFields: false,
  isDarkTheme: true,
  showAdvanceOptions: false,
  buttonData: {
    video: {
      label: "Record a video",
      color: "#000000",
      bgColor: "#ffffff",
    },
    text: {
      label: "Send in text",
      color: "#000000",
      bgColor: "#ffffff",
    },
  },
};

type Props = {
  _id?: string;
  defaultValues?: ShowcaseType | ShowcaseTypeMongo;
  isUpdate?: boolean;
};

const CreateShowcaseForm = ({
  _id = "",
  defaultValues = _defaultValues,
  isUpdate = false,
}: Props) => {
  const { replace, refresh } = useRouter();

  const form = useForm<ShowcaseType>({
    resolver: zodResolver(showcaseFormSchema),
    defaultValues,
  });

  const { fields, remove, insert } = useFieldArray({
    control: form.control,
    name: "customFields" as never,
  });

  useEffect(() => {
    if (form.watch("isCustomFields") === true && fields.length < 1) {
      insert(fields.length + 1, {
        id: uuidv4(),
        name: "",
        type: "text",
      });
    } else if (form.watch("isCustomFields") === false) {
      remove();
    }
  }, [form.watch("isCustomFields")]);

  async function onSubmit(values: Props["defaultValues"]) {
    try {
      let id = _id;

      if (isUpdate) {
        const formData = new FormData();

        const image = (values as ShowcaseTypeMongo)?.image as File;

        if (image && typeof image !== "string") {
          formData.append("image", image);
        }

        formData.append(
          "json",
          JSON.stringify({
            ...values,
          })
        );

        const response = await axios.put(`/showcase/${id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        const slug = response?.data?.slug;

        replace(`/showcase/${slug}/edit`);

        refresh();
      } else {
        const formData = new FormData();

        const image = (values as ShowcaseTypeMongo)?.image as File;

        if (image && typeof image !== "string") {
          formData.append("image", image);
        }

        formData.append(
          "json",
          JSON.stringify({
            ...values,
          })
        );

        const response = await axios.post("/showcase", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        const slug = response?.data?.slug;

        replace(`/${slug}`);
      }
    } catch (error) {}
  }

  return (
    <div className="grid gap-8">
      <div className="grid lg:grid-cols-2 gap-10 place-items-start">
        <PreviewShowcaseLook watch={form.watch} />

        <div className="w-full space-y-8">
          <Form {...form}>
            <h2>Create New Showcase</h2>

            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full space-y-6"
            >
              <InputFormField
                label="Showcase Name"
                name="name"
                description={`Public URL is: ${frontendUrl}/${
                  removeSpecialCharacters(form.watch("name")) || "your-showcase"
                }`}
                required
              />

              <div className="space-y-2">
                {form.watch("image") && (
                  <img
                    className="w-full"
                    src={
                      typeof form.watch("image") !== "string"
                        ? URL.createObjectURL(form.watch("image"))
                        : form.watch("image")
                    }
                    alt={"Showcase image"}
                    loading="lazy"
                  />
                )}

                <InputFormField
                  type="file"
                  label="Showcase Logo"
                  name="image"
                  required={!isUpdate}
                />
              </div>

              <InputFormField
                label="Header title"
                name="headerTitle"
                required
              />

              <Textarea
                label="Custom Message"
                name="message"
                description="Supports Markdown"
                required
              />

              <QuestionsDnd {...{ control: form.control }} />

              <SelectFormField
                label="Collection Type"
                name="collection"
                options={collectionTypeOptions}
                required
              />

              <div className="grid grid-cols-2">
                <Switch label="Collect star rating" name="collectStarRating" />

                <Switch label="Add Custom fields" name="isCustomFields" />
              </div>

              {form.watch("isCustomFields") && (
                <div className="grid gap-4">
                  {fields.length !== 0 && (
                    <div className="grid gap-4">
                      {fields.map(({ id }, i) => (
                        <div key={id} className="grid grid-cols-2 gap-4">
                          <InputFormField
                            label="Field Name"
                            name={`customFields.${i}.name`}
                            required
                          />

                          <SelectFormField
                            label="Field Type"
                            name={`customFields.${i}.type`}
                            options={fieldTypeOptions}
                            required
                          />
                        </div>
                      ))}
                    </div>
                  )}

                  <button
                    type="button"
                    className="text-xs p-1 px-2 rounded-sm flex gap-1 items-center font-medium"
                    onClick={() => {
                      insert(fields.length + 1, {
                        id: uuidv4(),
                        name: "",
                        type: "string",
                      });
                    }}
                  >
                    <PlusIcon size={18} />

                    <span>Add Fields</span>
                  </button>
                </div>
              )}

              <div className="grid grid-cols-2">
                <Switch label="Dark Theme" name="isDarkTheme" />

                <Switch label="Advance Options" name="showAdvanceOptions" />
              </div>

              {form.watch("showAdvanceOptions") && (
                <>
                  <div className="grid gap-4">
                    <div className="space-y-4 border p-4 rounded-lg">
                      <InputFormField
                        label="Video Button Label"
                        name="buttonData.video.label"
                      />

                      <InputWithColorPicker
                        form={form}
                        label="Video Button Label Color"
                        name="buttonData.video.color"
                      />

                      <InputWithColorPicker
                        form={form}
                        label="Video Button Color"
                        name="buttonData.video.bgColor"
                      />
                    </div>

                    <hr className="block md:hidden" />

                    <div className="space-y-4 border p-4 rounded-lg">
                      <InputFormField
                        label="Text Button Label"
                        name="buttonData.text.label"
                      />

                      <InputWithColorPicker
                        form={form}
                        label="Text Button Label Color"
                        name="buttonData.text.color"
                      />

                      <InputWithColorPicker
                        form={form}
                        label="Text Button Color"
                        name="buttonData.text.bgColor"
                      />
                    </div>
                  </div>
                </>
              )}

              <Button type="submit" isSubmitting={form.formState.isSubmitting}>
                {isUpdate ? "Update" : "Submit"}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default CreateShowcaseForm;
