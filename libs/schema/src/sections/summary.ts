import { z } from "zod";

import { defaultItem, itemSchema } from "../shared";

// Schema
export const summarySchema = itemSchema.extend({
  name: z.string(),
  description: z.string(),
  content: z.string(),
});

// Type
export type Summary = z.infer<typeof summarySchema>;

// Defaults
export const defaultSummary: Summary = {
  ...defaultItem,
  name: "",
  description: "",
  content: "",
};
