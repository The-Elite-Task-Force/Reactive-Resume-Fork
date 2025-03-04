import { idSchema } from "@reactive-resume/schema";
import { dateSchema } from "@reactive-resume/utils";
import { createZodDto } from "nestjs-zod/dto";
import { z } from "zod";

export const companySchema = z.object({
  id: idSchema,
  name: z.string(),
  ownerId: idSchema,
  updatedAt: dateSchema,
});

export class CompanyDto extends createZodDto(companySchema) {}
