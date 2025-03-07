import { z } from "zod";

import { defaultItem, defaultUrl, itemSchema, urlSchema } from "../shared";
import { customFieldSchema } from "./custom";

// Schema
export const basicsSchema = itemSchema.extend({
  name: z.string(),
  headline: z.string(),
  email: z.literal("").or(z.string().email()),
  phone: z.string(),
  location: z.string(),
  customFields: z.array(customFieldSchema),
  birthdate: z.string(),
  summary: z.string(),
  url: urlSchema,
  picture: z.object({
    url: z.string(),
    size: z.number().default(64),
    aspectRatio: z.number().default(1),
    borderRadius: z.number().default(0),
    effects: z.object({
      hidden: z.boolean().default(false),
      border: z.boolean().default(false),
      grayscale: z.boolean().default(false),
    }),
  }),
});

// Type
export type Basics = z.infer<typeof basicsSchema>;

// Defaults
export const defaultBasics: Basics = {
  ...defaultItem,
  name: "",
  headline: "",
  email: "",
  phone: "",
  location: "",
  summary: "",
  url: defaultUrl,
  customFields: [],
  birthdate: "",
  picture: {
    url: "",
    size: 64,
    aspectRatio: 1,
    borderRadius: 0,
    effects: {
      hidden: false,
      border: false,
      grayscale: false,
    },
  },
};

export * from "./custom";
