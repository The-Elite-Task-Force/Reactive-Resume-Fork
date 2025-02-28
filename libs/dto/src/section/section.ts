import { customSectionSchema, idSchema } from "@reactive-resume/schema";
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
  Volunteering = "volunteering",
  References = "references",
  Custom = "custom",
}

export const sectionSchema = z.object({
  id: idSchema,
  format: z.nativeEnum(SectionFormat),
  userId: idSchema,
  user: userSchema,
  data: z.union([
    basicsSchema,
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
  ]),
  updatedAt: dateSchema,
});

export const jsonSectionsSchema = z.object({
  basics: basicsSchema.optional(),
  experiences: z.array(experienceSchema).optional(),
  educations: z.array(educationSchema).optional(),
  skills: z.array(skillSchema).optional(),
  languages: z.array(languageSchema).optional(),
  awards: z.array(awardSchema).optional(),
  certifications: z.array(certificationSchema).optional(),
  interests: z.array(interestSchema).optional(),
  projects: z.array(projectSchema).optional(),
  profiles: z.array(profileSchema).optional(),
  publications: z.array(publicationSchema).optional(),
  volunteers: z.array(volunteerSchema).optional(),
  references: z.array(referenceSchema).optional(),
  customs: z.array(customSectionSchema).optional(),
});

export class SectionsDto extends createZodDto(jsonSectionsSchema) {}
export class SectionItemDto extends createZodDto(sectionSchema) {}
