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

export enum SectionFormat {
  Basics = "basics",
  Summary = "summaries",
  Profiles = "profiles",
  Experience = "experiences",
  Education = "educations",
  Skills = "skills",
  Languages = "languages",
  Awards = "awards",
  Certifications = "certifications",
  Interests = "interests",
  Projects = "projects",
  Publications = "publications",
  Volunteering = "volunteers",
  References = "references",
  Custom = "customs",
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
  format: z.nativeEnum(SectionFormat),
  userId: idSchema,
  user: userSchema,
  data: AllSectionSchemas,
  updatedAt: dateSchema,
});

export const jsonSectionsSchema = z.object({
  basics: z.array(basicsSchema),
  summaries: z.array(summarySchema),
  experiences: z.array(experienceSchema),
  educations: z.array(educationSchema),
  skills: z.array(skillSchema),
  languages: z.array(languageSchema),
  awards: z.array(awardSchema),
  certifications: z.array(certificationSchema),
  interests: z.array(interestSchema),
  projects: z.array(projectSchema),
  profiles: z.array(profileSchema),
  publications: z.array(publicationSchema),
  volunteers: z.array(volunteerSchema),
  references: z.array(referenceSchema),
  customs: z.array(customSectionSchema),
});

export class SectionsDto extends createZodDto(jsonSectionsSchema) {}
export class SectionItemDto extends createZodDto(sectionSchema) {}
