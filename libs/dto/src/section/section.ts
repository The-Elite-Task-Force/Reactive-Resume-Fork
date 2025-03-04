import { customSectionSchema, idSchema, summarySchema } from "@reactive-resume/schema";
import {
  awardSchema,
  basicsSchema,
  certificationSchema,
  educationSchema,
  experienceSchema,
  interestSchema,
  languageSchema,
  profileSchema,
  projectSchema,
  publicationSchema,
  referenceSchema,
  skillSchema,
  volunteerSchema,
} from "@reactive-resume/schema";
import { dateSchema } from "@reactive-resume/utils";
import { createZodDto } from "nestjs-zod/dto";
import { z } from "zod";

import { userSchema } from "../user";

export enum SECTION_FORMAT {
  Basics = "basics",
  Summary = "summary",
  Profiles = "profiles",
  Experience = "experience",
  Education = "education",
  Skills = "skills",
  Languages = "languages",
  Awards = "awards",
  Certifications = "certifications",
  Interests = "interests",
  Projects = "projects",
  Publications = "publications",
  Volunteering = "volunteer",
  References = "references",
  Custom = "custom",
}

export const AllSectionSchemas = z.union([
  basicsSchema,
  summarySchema,
  experienceSchema,
  educationSchema,
  skillSchema,
  languageSchema,
  awardSchema,
  certificationSchema,
  interestSchema,
  projectSchema,
  profileSchema,
  publicationSchema,
  volunteerSchema,
  referenceSchema,
  customSectionSchema,
]);

export const sectionSchema = z.object({
  id: idSchema,
  format: z.nativeEnum(SECTION_FORMAT),
  userId: idSchema,
  user: userSchema,
  data: AllSectionSchemas,
  updatedAt: dateSchema,
});

export const jsonSectionsSchema = z.object({
  basics: z.array(basicsSchema),
  summary: z.array(summarySchema),
  experience: z.array(experienceSchema),
  education: z.array(educationSchema),
  skills: z.array(skillSchema),
  languages: z.array(languageSchema),
  awards: z.array(awardSchema),
  certifications: z.array(certificationSchema),
  interests: z.array(interestSchema),
  projects: z.array(projectSchema),
  profiles: z.array(profileSchema),
  publications: z.array(publicationSchema),
  volunteer: z.array(volunteerSchema),
  references: z.array(referenceSchema),
  custom: z.array(customSectionSchema),
});

export class SectionsDto extends createZodDto(jsonSectionsSchema) {}
export class SectionItemDto extends createZodDto(sectionSchema) {}
