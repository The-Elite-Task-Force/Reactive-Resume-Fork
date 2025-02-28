import { z } from "zod";

import { idSchema } from "./id";

// Schema
export const itemSchema = z.object({
  id: idSchema,
  userId: idSchema,
  updatedAt: z.string(),
});

// Type
export type Item = z.infer<typeof itemSchema>;

// Defaults
export const defaultItem: Item = {
  id: "",
  userId: "",
  updatedAt: "",
};
