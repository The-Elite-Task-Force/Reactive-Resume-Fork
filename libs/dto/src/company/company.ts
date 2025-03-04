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

export enum COMPANY_STATUS {
  PENDING = "PENDING",
  ACCEPTED = "ACCEPTED",
  REJECTED = "REJECTED",
  TERMINATED = "TERMINATED",
}

export const CreateCompanyMappingSchema = z.object({
  companyId: idSchema,
  userId: z.string(),
});

export const activeInvitationsSchema = z.object({
  id: idSchema,
  userId: z.string(),
  companyId: z.string(),
  roleId: z.string(),
  status: z.nativeEnum(COMPANY_STATUS),
  invitedAt: z.string(),
  respondedAt: z.string().optional(),
  terminatedAt: z.string().optional(),
  company: companySchema,
});

export class CompanyDto extends createZodDto(companySchema) {}
export class CreateCompanyMappingDto extends createZodDto(CreateCompanyMappingSchema) {}
export class activeInvitationsDTO extends createZodDto(activeInvitationsSchema) {}
