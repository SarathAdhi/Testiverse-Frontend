import axios from "@lib/axios";
import { ShowcaseType } from "@schemas/showcaseSchema";
import { Button } from "@ui/button";
import { CheckboxFormField } from "@ui/checkbox/checkbox-form-field";
import { Form } from "@ui/form";
import { InputFormField } from "@ui/input/input-form-field";
import StarRating from "@ui/star-rating";
import { Textarea } from "@ui/textarea";
import Image from "next/image";
import { useFieldArray, useForm } from "react-hook-form";

type Props = {
  collectStarRating: boolean;
  customFields: ShowcaseType["customFields"];
  showcase: string;
  onClose: () => void;
};

type DefaultValueProps = {
  customFields: ({
    value: string | number | URL;
  } & ShowcaseType["customFields"][0])[];
  rating?: number;
  text: string;
  testimonialPermission?: boolean;
  user: {
    name: string;
    email: string;
    image?: File;
  };
};

const TextSubmitForm = ({
  collectStarRating,
  customFields,
  onClose,
  showcase,
}: Props) => {
  let defaultValues: DefaultValueProps = {
    customFields: customFields.map((field) => ({ ...field, value: "" })),
    text: "",
    user: {
      name: "",
      email: "",
      image: undefined,
    },
    testimonialPermission: false,
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
    try {
      const formData = new FormData();

      if (values.user.image) formData.append("user_image", values.user.image);

      formData.append(
        "json",
        JSON.stringify({
          ...values,
          type: "text",
          showcase,
        })
      );

      await axios.post(`/testimonial`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      form.reset(defaultValues);

      onClose();
    } catch (error) {}
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleVideoSubmit)}
          className="text-left w-full space-y-6"
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

          <Textarea
            label="Testimonial"
            name="text"
            placeholder="Write your testimonial here..."
            required
          />

          {fields.map(({ id, type, name }, i) => (
            <InputFormField
              label={name}
              key={id}
              name={`customFields.${i}.value`}
              type={type}
              required
            />
          ))}

          <CheckboxFormField
            name="testimonialPermission"
            label="Feel free to utilize this testimonial on various social channels and in other marketing initiatives with my approval."
          />

          <div className="grid grid-cols-2 gap-4">
            <Button
              onClick={onClose}
              disabled={form.formState.isSubmitting}
              variant="destructive"
            >
              Cancel
            </Button>

            <Button disabled={form.formState.isSubmitting}>Send</Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default TextSubmitForm;
