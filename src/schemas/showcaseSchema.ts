import { z } from "zod";

export const showcaseFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Showcase name must be at least 2 characters.",
    })
    .refine((value) => /^[a-zA-Z0-9 ]+$/.test(value), {
      message: "-, _ or any special characters are not allowed.",
    }),
  headerTitle: z.string(),
  image: z.any().optional(),
  message: z.string(),
  questions: z.array(
    z.object({
      id: z.string(),
      question: z.string().max(100, {
        message: "Question must be at maximum of 100 characters.",
      }),
    })
  ),
  collection: z.enum(["text-and-video", "text-only", "video-only"]),
  collectStarRating: z.boolean(),
  customFields: z.array(
    z.object({
      id: z.string(),
      name: z.any(),
      type: z.enum(["text", "number", "url"]),
    })
  ),
  isCustomFields: z.boolean(),
  showAdvanceOptions: z.boolean().optional(),
  isDarkTheme: z.boolean(),
  buttonData: z.object({
    video: z.object({
      label: z.string(),
      color: z.string(),
      bgColor: z.string(),
    }),
    text: z.object({
      label: z.string(),
      color: z.string(),
      bgColor: z.string(),
    }),
  }),
});

export type ShowcaseType = z.infer<typeof showcaseFormSchema>;

export type ShowcaseTypeMongo = {
  _id: string;
  slug: string;
  image: string;
} & z.infer<typeof showcaseFormSchema>;
