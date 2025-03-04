import { idSchema } from "@reactive-resume/schema";
import { createZodDto } from "nestjs-zod/dto";
import { z } from "zod";

import { SECTION_FORMAT } from "../section";

export const linkSchema = z
  .object({
    resumeId: idSchema,
    itemId: idSchema,
    order: z.number(),
  })
  .refine((data) => data.order >= 0, {});

export class LinkResumeToItemDto extends createZodDto(linkSchema) {}

export const APIlinkSchema = z
  .object({
    format: z.nativeEnum(SECTION_FORMAT),
    itemId: idSchema,
    order: z.number(),
  })
  .refine((data) => data.order >= 0, {});

export class APILinkResumeToItemDto extends createZodDto(APIlinkSchema) {}
