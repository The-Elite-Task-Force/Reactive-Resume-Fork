import { Injectable, InternalServerErrorException, Logger } from "@nestjs/common";
import { CreateSectionItemDto, UpdateSectionItemDto } from "@reactive-resume/dto";
import { PrismaService } from "nestjs-prisma";

@Injectable()
export class SectionItemService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(userId: string) {
    return this.prisma.sectionItem.findMany({ where: { userId }, orderBy: { updatedAt: "desc" } });
  }

  async createSectionItem(userId: string, createSectionDto: CreateSectionItemDto) {
    try {
      // Create the new section
      return await this.prisma.sectionItem.create({
        data: {
          data: createSectionDto.data,
          format: createSectionDto.format,
          userId: userId,
        },
      });
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
