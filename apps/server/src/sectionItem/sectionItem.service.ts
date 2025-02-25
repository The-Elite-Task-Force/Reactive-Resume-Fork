import { Injectable, InternalServerErrorException, Logger } from "@nestjs/common";
import { CreateSectionItemDto, UpdateSectionItemDto } from "@reactive-resume/dto";
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
  parseVolunteerData,
} from "../utils/section-parsers";

@Injectable()
export class SectionItemService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(userId: string) {
    return this.prisma.sectionItem.findMany({ where: { userId }, orderBy: { updatedAt: "desc" } });
  }

  async createSectionItem(userId: string, createSectionDto: CreateSectionItemDto) {
    try {
      const { format, data } = createSectionDto;

      switch (format) {
        case "basics": {
          const parsedData = parseBasicData(data);
          return await this.prisma.basicsItem.create({
            data: {
              ...parsedData,
              userId: userId,
            },
          });
        }
        case "profiles": {
          const parsedData = parseProfileData(data);
          return await this.prisma.profileItem.create({
            data: {
              ...parsedData,
              userId: userId,
            },
          });
        }
        case "experience": {
          const parsedData = parseExperienceData(data);
          return await this.prisma.workItem.create({
            data: {
              ...parsedData,
              userId: userId,
            },
          });
        }
        case "education": {
          const parsedData = parseEducationData(data);
          return await this.prisma.educationItem.create({
            data: {
              ...parsedData,
              userId: userId,
            },
          });
        }
        case "skills": {
          const parsedData = parseSkillData(data);
          return await this.prisma.skillItem.create({
            data: {
              ...parsedData,
              userId: userId,
            },
          });
        }
        case "languages": {
          const parsedData = parseLanguageData(data);
          return await this.prisma.languageItem.create({
            data: {
              ...parsedData,
              userId: userId,
            },
          });
        }
        case "awards": {
          const parsedData = parseAwardData(data);
          return await this.prisma.awardItem.create({
            data: {
              ...parsedData,
              userId: userId,
            },
          });
        }
        case "certifications": {
          const parsedData = parseCertificationData(data);
          return await this.prisma.certificationItem.create({
            data: {
              ...parsedData,
              userId: userId,
            },
          });
        }
        case "interests": {
          const parsedData = parseInterestData(data);
          return await this.prisma.interestItem.create({
            data: {
              ...parsedData,
              userId: userId,
            },
          });
        }
        case "projects": {
          const parsedData = parseProjectData(data);
          return await this.prisma.projectItem.create({
            data: {
              ...parsedData,
              userId: userId,
            },
          });
        }
        case "publications": {
          const parsedData = parsePublicationData(data);
          return await this.prisma.publicationItem.create({
            data: {
              ...parsedData,
              userId: userId,
            },
          });
        }
        case "volunteering": {
          const parsedData = parseVolunteerData(data);
          return await this.prisma.volunteerItem.create({
            data: {
              ...parsedData,
              userId: userId,
            },
          });
        }
        case "references": {
          const parsedData = parseReferenceData(data);
          return await this.prisma.referenceItem.create({
            data: {
              ...parsedData,
              userId: userId,
            },
          });
        }
        case "custom": {
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
    try {
      return await this.prisma.sectionItem.update({
        data: {
          data: updateSectionDto.data,
        },
        where: { userId_id: { userId, id } },
      });
    } catch (error) {
      Logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }

  async deleteSectionItem(id: string) {
    try {
      return await this.prisma.sectionItem.delete({ where: { id } });
    } catch (error) {
      Logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }

  async deleteWorkItem(id: string) {
    try {
      return await this.prisma.workItem.delete({ where: { id } });
    } catch (error) {
      Logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }

  async deleteAwardItem(id: string) {
    try {
      return await this.prisma.awardItem.delete({ where: { id } });
    } catch (error) {
      Logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }

  async deleteSkillItem(id: string) {
    try {
      return await this.prisma.skillItem.delete({ where: { id } });
    } catch (error) {
      Logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }

  async deleteProjectItem(id: string) {
    try {
      return await this.prisma.projectItem.delete({ where: { id } });
    } catch (error) {
      Logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }

  async deleteEducationItem(id: string) {
    try {
      return await this.prisma.educationItem.delete({ where: { id } });
    } catch (error) {
      Logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }

  async deleteInterestItem(id: string) {
    try {
      return await this.prisma.interestItem.delete({ where: { id } });
    } catch (error) {
      Logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }

  async deleteLanguageItem(id: string) {
    try {
      return await this.prisma.languageItem.delete({ where: { id } });
    } catch (error) {
      Logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }

  async deleteVolunteerItem(id: string) {
    try {
      return await this.prisma.volunteerItem.delete({ where: { id } });
    } catch (error) {
      Logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }

  async deleteReferenceItem(id: string) {
    try {
      return await this.prisma.referenceItem.delete({ where: { id } });
    } catch (error) {
      Logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }

  async deletePublicationItem(id: string) {
    try {
      return await this.prisma.publicationItem.delete({ where: { id } });
    } catch (error) {
      Logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }

  async deleteCertificationItem(id: string) {
    try {
      return await this.prisma.certificationItem.delete({ where: { id } });
    } catch (error) {
      Logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }

  async deleteProfileItem(id: string) {
    try {
      return await this.prisma.profileItem.delete({ where: { id } });
    } catch (error) {
      Logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }

  async deleteBasicsItem(id: string) {
    try {
      return await this.prisma.basicsItem.delete({ where: { id } });
    } catch (error) {
      Logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }
}
