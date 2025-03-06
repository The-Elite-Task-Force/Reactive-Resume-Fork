import { deleteSchema } from "@reactive-resume/dto";
import { idSchema } from "@reactive-resume/schema";
import { createZodDto } from "nestjs-zod/dto";
import { z } from "zod";

export const deleteMappingSchema = deleteSchema.extend({
  resumeId: idSchema,
  format: z.string(),
});

export class DeleteMappingDto extends createZodDto(deleteMappingSchema) {}
