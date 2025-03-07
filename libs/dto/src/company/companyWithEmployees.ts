import { idSchema } from "@reactive-resume/schema";
import { dateSchema } from "@reactive-resume/utils";
import { createZodDto } from "nestjs-zod/dto";
import { z } from "zod";

export const companyWithEmployees = z.object({
  id: idSchema,
  name: z.string(),
  ownerId: idSchema,
  updatedAt: dateSchema,
  employees: z
    .array(
      z.object({
        id: idSchema,
        username: z.string(),
        email: z.string(),
        role: z.array(z.string()).nullable(),
        updatedAt: dateSchema,
      }),
    )
    .nullable(),
});

export class CompanyWithEmployees extends createZodDto(companyWithEmployees) {}
