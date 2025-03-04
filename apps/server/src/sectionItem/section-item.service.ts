import { Injectable, InternalServerErrorException, Logger } from "@nestjs/common";
import { CreateSectionItemDto, SECTION_FORMAT, UpdateSectionItemDto } from "@reactive-resume/dto";
import {
  defaultAward,
  defaultBasics,
  defaultCertification,
  defaultCustomSection,
  defaultEducation,
  defaultExperience,
  defaultInterest,
  defaultLanguage,
  defaultProfile,
  defaultProject,
  defaultPublication,
  defaultReference,
  defaultSkill,
  defaultSummary,
  defaultVolunteer,
} from "@reactive-resume/schema";
import { PrismaService } from "nestjs-prisma";

import {
  parseAwardData,
  parseBasicData,
  parseCertificationData,
  parseCustomData,
  parseEducationData,
  parseExperienceData,
  parseInterestData,
  parseLanguageData,
  parseProfileData,
  parseProjectData,
  parsePublicationData,
  parseReferenceData,
  parseSkillData,
  parseSummaryData,
  parseVolunteerData,
} from "../utils/section-parsers";

@Injectable()
export class SectionItemService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(userId: string) {
    try {
      const basics = await this.prisma.basicsItem.findMany({
        where: { userId },
        orderBy: { updatedAt: "desc" },
      });
      const summary = await this.prisma.summaryItem.findMany({
        where: { userId },
        orderBy: { updatedAt: "desc" },
      });
      const profiles = await this.prisma.profileItem.findMany({
        where: { userId },
        orderBy: { updatedAt: "desc" },
      });
      const experience = await this.prisma.workItem.findMany({
        where: { userId },
        orderBy: { updatedAt: "desc" },
      });
      const education = await this.prisma.educationItem.findMany({
        where: { userId },
        orderBy: { updatedAt: "desc" },
      });
      const skills = await this.prisma.skillItem.findMany({
        where: { userId },
        orderBy: { updatedAt: "desc" },
      });
      const languages = await this.prisma.languageItem.findMany({
        where: { userId },
        orderBy: { updatedAt: "desc" },
      });
      const awards = await this.prisma.awardItem.findMany({
        where: { userId },
        orderBy: { updatedAt: "desc" },
      });
      const certifications = await this.prisma.certificationItem.findMany({
        where: { userId },
        orderBy: { updatedAt: "desc" },
      });
      const interests = await this.prisma.interestItem.findMany({
        where: { userId },
        orderBy: { updatedAt: "desc" },
      });
      const projects = await this.prisma.projectItem.findMany({
        where: { userId },
        orderBy: { updatedAt: "desc" },
      });
      const publications = await this.prisma.publicationItem.findMany({
        where: { userId },
        orderBy: { updatedAt: "desc" },
      });
      const volunteer = await this.prisma.volunteerItem.findMany({
        where: { userId },
        orderBy: { updatedAt: "desc" },
      });
      const references = await this.prisma.referenceItem.findMany({
        where: { userId },
        orderBy: { updatedAt: "desc" },
      });
      const custom = await this.prisma.customItem.findMany({
        where: { userId },
        orderBy: { updatedAt: "desc" },
      });

      if (basics.length === 0) basics.push(defaultBasics);
      if (summary.length === 0) summary.push(defaultSummary);
      if (profiles.length === 0) profiles.push(defaultProfile);
      if (experience.length === 0) experience.push(defaultExperience);
      if (education.length === 0) education.push(defaultEducation);
      if (skills.length === 0) skills.push(defaultSkill);
      if (languages.length === 0) languages.push(defaultLanguage);
      if (awards.length === 0) awards.push(defaultAward);
      if (certifications.length === 0) certifications.push(defaultCertification);
      if (interests.length === 0) interests.push(defaultInterest);
      if (projects.length === 0) projects.push(defaultProject);
      if (publications.length === 0) publications.push(defaultPublication);
      if (volunteer.length === 0) volunteer.push(defaultVolunteer);
      if (references.length === 0) references.push(defaultReference);
      if (custom.length === 0) custom.push(defaultCustomSection);

      return {
        basics,
        profiles,
        summary,
        experience,
        education,
        skills,
        languages,
        awards,
        certifications,
        interests,
        projects,
        publications,
        volunteer,
        references,
        custom,
      };
    } catch (error) {
      Logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }
  async createSectionItem(userId: string, createSectionDto: CreateSectionItemDto) {
    try {
      const { format, data } = createSectionDto;

      switch (format) {
        case SECTION_FORMAT.Basics: {
          const parsedData = parseBasicData(data);
          return await this.prisma.basicsItem.create({
            data: {
              ...parsedData,
              userId: userId,
            },
          });
        }
        case SECTION_FORMAT.Profiles: {
          const parsedData = parseProfileData(data);
          return await this.prisma.profileItem.create({
            data: {
              ...parsedData,
              userId: userId,
            },
          });
        }
        case SECTION_FORMAT.Experience: {
          const parsedData = parseExperienceData(data);
          return await this.prisma.workItem.create({
            data: {
              ...parsedData,
              userId: userId,
            },
          });
        }
        case SECTION_FORMAT.Education: {
          const parsedData = parseEducationData(data);
          return await this.prisma.educationItem.create({
            data: {
              ...parsedData,
              userId: userId,
            },
          });
        }
        case SECTION_FORMAT.Skills: {
          const parsedData = parseSkillData(data);
          return await this.prisma.skillItem.create({
            data: {
              ...parsedData,
              userId: userId,
            },
          });
        }
        case SECTION_FORMAT.Languages: {
          const parsedData = parseLanguageData(data);
          return await this.prisma.languageItem.create({
            data: {
              ...parsedData,
              userId: userId,
            },
          });
        }
        case SECTION_FORMAT.Awards: {
          const parsedData = parseAwardData(data);
          return await this.prisma.awardItem.create({
            data: {
              ...parsedData,
              userId: userId,
            },
          });
        }
        case SECTION_FORMAT.Certifications: {
          const parsedData = parseCertificationData(data);
          return await this.prisma.certificationItem.create({
            data: {
              ...parsedData,
              userId: userId,
            },
          });
        }
        case SECTION_FORMAT.Interests: {
          const parsedData = parseInterestData(data);
          return await this.prisma.interestItem.create({
            data: {
              ...parsedData,
              userId: userId,
            },
          });
        }
        case SECTION_FORMAT.Projects: {
          const parsedData = parseProjectData(data);
          return await this.prisma.projectItem.create({
            data: {
              ...parsedData,
              userId: userId,
            },
          });
        }
        case SECTION_FORMAT.Publications: {
          const parsedData = parsePublicationData(data);
          return await this.prisma.publicationItem.create({
            data: {
              ...parsedData,
              userId: userId,
            },
          });
        }
        case SECTION_FORMAT.Volunteering: {
          const parsedData = parseVolunteerData(data);
          return await this.prisma.volunteerItem.create({
            data: {
              ...parsedData,
              userId: userId,
            },
          });
        }
        case SECTION_FORMAT.References: {
          const parsedData = parseReferenceData(data);
          return await this.prisma.referenceItem.create({
            data: {
              ...parsedData,
              userId: userId,
            },
          });
        }
        case SECTION_FORMAT.Summary: {
          const parsedData = parseSummaryData(data);
          return await this.prisma.summaryItem.create({
            data: {
              ...parsedData,
              userId: userId,
            },
          });
        }
        case SECTION_FORMAT.Custom: {
          const parsedData = parseCustomData(data);
          return await this.prisma.customItem.create({
            data: {
              ...parsedData,
              userId: userId,
            },
          });
        }
        default: {
          throw new Error("Invalid section type");
        }
      }
    } catch (error) {
      Logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }

  async updateSectionItem(userId: string, id: string, updateSectionDto: UpdateSectionItemDto) {
    const { data, format } = updateSectionDto;
    if (!data || !format) {
      throw new Error("Data is required");
    }
    try {
      switch (format) {
        case SECTION_FORMAT.Basics: {
          const parsedData = parseBasicData(data);
          return await this.prisma.basicsItem.update({
            data: parsedData,
            where: { userId_id: { userId, id } },
          });
        }

        case SECTION_FORMAT.Profiles: {
          const parsedData = parseProfileData(data);
          return await this.prisma.profileItem.update({
            data: parsedData,
            where: { userId_id: { userId, id } },
          });
        }

        case SECTION_FORMAT.Experience: {
          const parsedData = parseExperienceData(data);
          return await this.prisma.workItem.update({
            data: parsedData,
            where: { userId_id: { userId, id } },
          });
        }

        case SECTION_FORMAT.Education: {
          const parsedData = parseEducationData(data);
          return await this.prisma.educationItem.update({
            data: parsedData,
            where: { userId_id: { userId, id } },
          });
        }

        case SECTION_FORMAT.Skills: {
          const parsedData = parseSkillData(data);
          return await this.prisma.skillItem.update({
            data: parsedData,
            where: { userId_id: { userId, id } },
          });
        }

        case SECTION_FORMAT.Languages: {
          const parsedData = parseLanguageData(data);
          return await this.prisma.languageItem.update({
            data: parsedData,
            where: { userId_id: { userId, id } },
          });
        }

        case SECTION_FORMAT.Awards: {
          const parsedData = parseAwardData(data);
          return await this.prisma.awardItem.update({
            data: parsedData,
            where: { userId_id: { userId, id } },
          });
        }

        case SECTION_FORMAT.Certifications: {
          const parsedData = parseCertificationData(data);
          return await this.prisma.certificationItem.update({
            data: parsedData,
            where: { userId_id: { userId, id } },
          });
        }

        case SECTION_FORMAT.Interests: {
          const parsedData = parseInterestData(data);
          return await this.prisma.interestItem.update({
            data: parsedData,
            where: { userId_id: { userId, id } },
          });
        }

        case SECTION_FORMAT.Projects: {
          const parsedData = parseProjectData(data);
          return await this.prisma.projectItem.update({
            data: parsedData,
            where: { userId_id: { userId, id } },
          });
        }

        case SECTION_FORMAT.Publications: {
          const parsedData = parsePublicationData(data);
          return await this.prisma.publicationItem.update({
            data: parsedData,
            where: { userId_id: { userId, id } },
          });
        }

        case SECTION_FORMAT.Volunteering: {
          const parsedData = parseVolunteerData(data);
          return await this.prisma.volunteerItem.update({
            data: parsedData,
            where: { userId_id: { userId, id } },
          });
        }

        case SECTION_FORMAT.References: {
          const parsedData = parseReferenceData(data);
          return await this.prisma.referenceItem.update({
            data: parsedData,
            where: { userId_id: { userId, id } },
          });
        }

        case SECTION_FORMAT.Summary: {
          const parsedData = parseSummaryData(data);
          return await this.prisma.referenceItem.update({
            data: parsedData,
            where: { userId_id: { userId, id } },
          });
        }
        case SECTION_FORMAT.Custom: {
          const parsedData = parseCustomData(data);
          return await this.prisma.customItem.update({
            data: parsedData,
            where: { userId_id: { userId, id } },
          });
        }

        default: {
          throw new Error("Invalid section type");
        }
      }
    } catch (error) {
      Logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }

  async deleteSectionItem(format: SECTION_FORMAT, id: string) {
    try {
      switch (format) {
        case SECTION_FORMAT.Basics: {
          return await this.prisma.basicsItem.delete({ where: { id } });
        }
        case SECTION_FORMAT.Profiles: {
          return await this.prisma.profileItem.delete({ where: { id } });
        }
        case SECTION_FORMAT.Experience: {
          return await this.prisma.workItem.delete({ where: { id } });
        }
        case SECTION_FORMAT.Education: {
          return await this.prisma.educationItem.delete({ where: { id } });
        }
        case SECTION_FORMAT.Skills: {
          return await this.prisma.skillItem.delete({ where: { id } });
        }
        case SECTION_FORMAT.Languages: {
          return await this.prisma.languageItem.delete({ where: { id } });
        }
        case SECTION_FORMAT.Awards: {
          return await this.prisma.awardItem.delete({ where: { id } });
        }
        case SECTION_FORMAT.Certifications: {
          return await this.prisma.certificationItem.delete({ where: { id } });
        }
        case SECTION_FORMAT.Interests: {
          return await this.prisma.interestItem.delete({ where: { id } });
        }
        case SECTION_FORMAT.Projects: {
          return await this.prisma.projectItem.delete({ where: { id } });
        }
        case SECTION_FORMAT.Publications: {
          return await this.prisma.publicationItem.delete({ where: { id } });
        }
        case SECTION_FORMAT.Volunteering: {
          return await this.prisma.volunteerItem.delete({ where: { id } });
        }
        case SECTION_FORMAT.References: {
          return await this.prisma.referenceItem.delete({ where: { id } });
        }
        case SECTION_FORMAT.Summary: {
          return await this.prisma.summaryItem.delete({ where: { id } });
        }
        case SECTION_FORMAT.Custom: {
          return await this.prisma.customItem.delete({ where: { id } });
        }
        default: {
          throw new Error("Invalid section type");
        }
      }
    } catch (error) {
      Logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }
}
