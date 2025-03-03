import { idSchema } from "@reactive-resume/schema";
import { dateSchema } from "@reactive-resume/utils";
import { createZodDto } from "nestjs-zod/dto";
import { z } from "zod";

export const employeeSchema = z.object({
  id: idSchema,
  email: z.string(),
  username: z.string(),
  role: z.array(z.string()).nullable(),
  updatedAt: dateSchema,
});

export class EmployeeDto extends createZodDto(employeeSchema) {}
