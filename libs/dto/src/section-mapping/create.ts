import { idSchema } from "@reactive-resume/schema";
import { createZodDto } from "nestjs-zod/dto";
import { z } from "zod";

export const createSectionMappingSchema = z.object({
  resumeId: idSchema,
  itemId: idSchema,
  format: z.string(),
});

export class CreateSectionMappingDto extends createZodDto(createSectionMappingSchema) {}
