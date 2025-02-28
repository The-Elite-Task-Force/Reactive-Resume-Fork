import { z } from "zod";

import { defaultItem, itemSchema } from "../shared";

// Schema
export const summarySchema = itemSchema.extend({
  content: z.string(),
});

// Type
export type Summary = z.infer<typeof summarySchema>;

// Defaults
export const defaultSummary: Summary = {
  ...defaultItem,
  content: "",
};
