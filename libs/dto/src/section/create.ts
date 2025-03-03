import { createZodDto } from "nestjs-zod/dto";
import { z } from "zod";

import { AllSectionSchemas, SectionFormat } from "./section";

export const createSectionSchema = z.object({
  format: z.enum([
    SectionFormat.Basics,
    SectionFormat.Summary,
    SectionFormat.Experience,
    SectionFormat.Education,
    SectionFormat.Skills,
    SectionFormat.Languages,
    SectionFormat.Awards,
    SectionFormat.Certifications,
    SectionFormat.Interests,
    SectionFormat.Profiles,
    SectionFormat.Projects,
    SectionFormat.Volunteering,
    SectionFormat.Publications,
    SectionFormat.References,
    SectionFormat.Custom,
  ]),

  data: AllSectionSchemas,
});

export class CreateSectionItemDto extends createZodDto(createSectionSchema) {}
