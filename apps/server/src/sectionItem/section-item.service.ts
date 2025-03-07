import { Injectable, InternalServerErrorException, Logger } from "@nestjs/common";
import { CreateSectionItemDto, SECTION_FORMAT, UpdateSectionItemDto } from "@reactive-resume/dto";
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
      const { format, data, resumeId } = createSectionDto;
      let createdItem;
      switch (format) {
        case SECTION_FORMAT.Basics: {
          const parsedData = parseBasicData(data);
          createdItem = await this.prisma.basicsItem.create({
            data: {
              ...parsedData,
              userId: userId,
            },
          });
          if (resumeId) {
            await this.prisma.resumeBasicsItemMapping.create({
              data: {
                resumeId,
                basicsItemId: createdItem.id,
                order: 0, // Set the order as needed
              },
            });
          }
          break;
        }
        case SECTION_FORMAT.Profiles: {
          const parsedData = parseProfileData(data);
          createdItem = await this.prisma.profileItem.create({
            data: {
              ...parsedData,
              userId: userId,
            },
          });
          if (resumeId) {
            await this.prisma.resumeProfileItemMapping.create({
              data: {
                resumeId,
                profileItemId: createdItem.id,
                order: 0, // Set the order as needed
              },
            });
          }
          break;
        }
        case SECTION_FORMAT.Experience: {
          const parsedData = parseExperienceData(data);
          createdItem = await this.prisma.workItem.create({
            data: {
              ...parsedData,
              userId: userId,
            },
          });
          if (resumeId) {
            await this.prisma.resumeWorkItemMapping.create({
              data: {
                resumeId,
                workItemId: createdItem.id,
                order: 0, // Set the order as needed
              },
            });
          }
          break;
        }
        case SECTION_FORMAT.Education: {
          const parsedData = parseEducationData(data);
          createdItem = await this.prisma.educationItem.create({
            data: {
              ...parsedData,
              userId: userId,
            },
          });
          if (resumeId) {
            await this.prisma.resumeEducationItemMapping.create({
              data: {
                resumeId,
                educationItemId: createdItem.id,
                order: 0, // Set the order as needed
              },
            });
          }
          break;
        }
        case SECTION_FORMAT.Skills: {
          const parsedData = parseSkillData(data);
          createdItem = await this.prisma.skillItem.create({
            data: {
              ...parsedData,
              userId: userId,
            },
          });
          if (resumeId) {
            await this.prisma.resumeSkillItemMapping.create({
              data: {
                resumeId,
                skillItemId: createdItem.id,
                order: 0, // Set the order as needed
              },
            });
          }
          break;
        }
        case SECTION_FORMAT.Languages: {
          const parsedData = parseLanguageData(data);
          createdItem = await this.prisma.languageItem.create({
            data: {
              ...parsedData,
              userId: userId,
            },
          });
          if (resumeId) {
            await this.prisma.resumeLanguageItemMapping.create({
              data: {
                resumeId,
                languageItemId: createdItem.id,
                order: 0, // Set the order as needed
              },
            });
          }
          break;
        }
        case SECTION_FORMAT.Awards: {
          const parsedData = parseAwardData(data);
          createdItem = await this.prisma.awardItem.create({
            data: {
              ...parsedData,
              userId: userId,
            },
          });
          if (resumeId) {
            await this.prisma.resumeAwardItemMapping.create({
              data: {
                resumeId,
                awardItemId: createdItem.id,
                order: 0, // Set the order as needed
              },
            });
          }
          break;
        }
        case SECTION_FORMAT.Certifications: {
          const parsedData = parseCertificationData(data);
          createdItem = await this.prisma.certificationItem.create({
            data: {
              ...parsedData,
              userId: userId,
            },
          });
          if (resumeId) {
            await this.prisma.resumeCertificationItemMapping.create({
              data: {
                resumeId,
                certificationItemId: createdItem.id,
                order: 0, // Set the order as needed
              },
            });
          }
          break;
        }
        case SECTION_FORMAT.Interests: {
          const parsedData = parseInterestData(data);
          createdItem = await this.prisma.interestItem.create({
            data: {
              ...parsedData,
              userId: userId,
            },
          });
          if (resumeId) {
            await this.prisma.resumeInterestItemMapping.create({
              data: {
                resumeId,
                interestItemId: createdItem.id,
                order: 0, // Set the order as needed
              },
            });
          }
          break;
        }
        case SECTION_FORMAT.Projects: {
          const parsedData = parseProjectData(data);
          createdItem = await this.prisma.projectItem.create({
            data: {
              ...parsedData,
              userId: userId,
            },
          });
          if (resumeId) {
            await this.prisma.resumeProjectItemMapping.create({
              data: {
                resumeId,
                projectItemId: createdItem.id,
                order: 0, // Set the order as needed
              },
            });
          }
          break;
        }
        case SECTION_FORMAT.Publications: {
          const parsedData = parsePublicationData(data);
          createdItem = await this.prisma.publicationItem.create({
            data: {
              ...parsedData,
              userId: userId,
            },
          });
          if (resumeId) {
            await this.prisma.resumePublicationItemMapping.create({
              data: {
                resumeId,
                publicationItemId: createdItem.id,
                order: 0, // Set the order as needed
              },
            });
          }
          break;
        }
        case SECTION_FORMAT.Volunteering: {
          const parsedData = parseVolunteerData(data);
          createdItem = await this.prisma.volunteerItem.create({
            data: {
              ...parsedData,
              userId: userId,
            },
          });
          if (resumeId) {
            await this.prisma.resumeVolunteerItemMapping.create({
              data: {
                resumeId,
                volunteerItemId: createdItem.id,
                order: 0, // Set the order as needed
              },
            });
          }
          break;
        }
        case SECTION_FORMAT.References: {
          const parsedData = parseReferenceData(data);
          createdItem = await this.prisma.referenceItem.create({
            data: {
              ...parsedData,
              userId: userId,
            },
          });
          if (resumeId) {
            await this.prisma.resumeReferenceItemMapping.create({
              data: {
                resumeId,
                referenceItemId: createdItem.id,
                order: 0, // Set the order as needed
              },
            });
          }
          break;
        }
        case SECTION_FORMAT.Summary: {
          const parsedData = parseSummaryData(data);
          createdItem = await this.prisma.summaryItem.create({
            data: {
              ...parsedData,
              userId: userId,
            },
          });
          if (resumeId) {
            await this.prisma.resumeSummaryItemMapping.create({
              data: {
                resumeId,
                summaryItemId: createdItem.id,
                order: 0, // Set the order as needed
              },
            });
          }
          break;
        }
        case SECTION_FORMAT.Custom: {
          const parsedData = parseCustomData(data);
          createdItem = await this.prisma.customItem.create({
            data: {
              ...parsedData,
              userId: userId,
            },
          });
          if (resumeId) {
            await this.prisma.resumeCustomItemMapping.create({
              data: {
                resumeId,
                customItemId: createdItem.id,
                order: 0, // Set the order as needed
              },
            });
          }
          break;
        }
        default: {
          throw new Error("Invalid section type");
        }
      }
      return createdItem;
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

  async deleteSectionItem(userId: string, format: SECTION_FORMAT, id: string) {
    try {
      switch (format) {
        case SECTION_FORMAT.Basics: {
          return await this.prisma.basicsItem.delete({ where: { id, userId } });
        }
        case SECTION_FORMAT.Profiles: {
          return await this.prisma.profileItem.delete({ where: { id, userId } });
        }
        case SECTION_FORMAT.Experience: {
          return await this.prisma.workItem.delete({ where: { id, userId } });
        }
        case SECTION_FORMAT.Education: {
          return await this.prisma.educationItem.delete({ where: { id, userId } });
        }
        case SECTION_FORMAT.Skills: {
          return await this.prisma.skillItem.delete({ where: { id, userId } });
        }
        case SECTION_FORMAT.Languages: {
          return await this.prisma.languageItem.delete({ where: { id, userId } });
        }
        case SECTION_FORMAT.Awards: {
          return await this.prisma.awardItem.delete({ where: { id, userId } });
        }
        case SECTION_FORMAT.Certifications: {
          return await this.prisma.certificationItem.delete({ where: { id, userId } });
        }
        case SECTION_FORMAT.Interests: {
          return await this.prisma.interestItem.delete({ where: { id, userId } });
        }
        case SECTION_FORMAT.Projects: {
          return await this.prisma.projectItem.delete({ where: { id, userId } });
        }
        case SECTION_FORMAT.Publications: {
          return await this.prisma.publicationItem.delete({ where: { id, userId } });
        }
        case SECTION_FORMAT.Volunteering: {
          return await this.prisma.volunteerItem.delete({ where: { id, userId } });
        }
        case SECTION_FORMAT.References: {
          return await this.prisma.referenceItem.delete({ where: { id, userId } });
        }
        case SECTION_FORMAT.Summary: {
          return await this.prisma.summaryItem.delete({ where: { id, userId } });
        }
        case SECTION_FORMAT.Custom: {
          return await this.prisma.customItem.delete({ where: { id, userId } });
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
