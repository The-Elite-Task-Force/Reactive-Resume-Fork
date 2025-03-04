import { z } from "zod";

import { defaultItem, defaultUrl, itemSchema, urlSchema } from "../shared";

// Schema
export const referenceSchema = itemSchema.extend({
  name: z.string().min(1),
  description: z.string(),
  summary: z.string(),
  url: urlSchema,
  email: z.string(),
  phone: z.string(),
  relationship: z.string(),
});

// Type
export type Reference = z.infer<typeof referenceSchema>;

// Defaults
export const defaultReference: Reference = {
  ...defaultItem,
  name: "",
  description: "",
  summary: "",
  url: defaultUrl,
  email: "",
  phone: "",
  relationship: "",
};
