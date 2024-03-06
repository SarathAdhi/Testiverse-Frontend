import { z } from "zod";

const testimonialSchema = z
  .object({
    type: z.enum(["video", "text"]),
    file: z.string().optional(),
    text: z.string().optional(),
    rating: z.string().optional(),
    customFields: z.array(
      z
        .object({
          id: z.string(),
          name: z.string(),
          value: z.string(),
          type: z.enum(["text", "number", "url"]),
        })
        .optional()
    ),
    user: z
      .object({
        name: z.string(),
        email: z.string().email(),
        image: z.string(),
      })
      .optional(),
    showcase: z.string(),
    createdAt: z.date(),
  })
  .refine((data) => (data.type === "video" ? true : data.text !== undefined), {
    message: "Text field is required for non-video testimonials.",
  })
  .refine(
    (data) =>
      data.type === "video"
        ? true
        : (data.user?.email && data.user.name) !== undefined,
    {
      message: "User details is required.",
    }
  );

export type TestimonialType = z.infer<typeof testimonialSchema>;

export type TestimonialTypeMongo = {
  _id: string;
} & TestimonialType;
