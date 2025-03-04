import { createZodDto } from "nestjs-zod/dto";
import { z } from "zod";

import { AllSectionSchemas, SECTION_FORMAT } from "./section";

export const createSectionSchema = z.object({
  format: z.enum([
    SECTION_FORMAT.Basics,
    SECTION_FORMAT.Summary,
    SECTION_FORMAT.Experience,
    SECTION_FORMAT.Education,
    SECTION_FORMAT.Skills,
    SECTION_FORMAT.Languages,
    SECTION_FORMAT.Awards,
    SECTION_FORMAT.Certifications,
    SECTION_FORMAT.Interests,
    SECTION_FORMAT.Profiles,
    SECTION_FORMAT.Projects,
    SECTION_FORMAT.Volunteering,
    SECTION_FORMAT.Publications,
    SECTION_FORMAT.References,
    SECTION_FORMAT.Custom,
  ]),

  data: AllSectionSchemas,
});

export class CreateSectionItemDto extends createZodDto(createSectionSchema) {}
