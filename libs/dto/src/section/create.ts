import { createZodDto } from "nestjs-zod/dto";
import { z } from "zod";

import { AllSectionSchemas, SectionFormat } from "./section";

export const createSectionSchema = z.object({
  format: z.enum([
    SectionFormat.Basics,
    SectionFormat.Summaries,
    SectionFormat.Experiences,
    SectionFormat.Educations,
    SectionFormat.Skills,
    SectionFormat.Languages,
    SectionFormat.Awards,
    SectionFormat.Certifications,
    SectionFormat.Interests,
    SectionFormat.Profiles,
    SectionFormat.Projects,
    SectionFormat.Volunteers,
    SectionFormat.Publications,
    SectionFormat.References,
    SectionFormat.Customs,
  ]),

  data: AllSectionSchemas,
});

export class CreateSectionItemDto extends createZodDto(createSectionSchema) {}
