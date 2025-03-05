import { Injectable } from "@nestjs/common";
import {
  COMPANY_STATUS,
  CompanyDto,
  CreateCompanyDto,
  CreateCompanyMappingDto,
  UpdateCompanyDto,
} from "@reactive-resume/dto";
import { PrismaService } from "nestjs-prisma";

@Injectable()
export class CompanyService {
  constructor(private readonly prisma: PrismaService) {}

  async getCompanyByOwnerId(id: string): Promise<CompanyDto[]> {
    return this.prisma.company.findMany({
      where: { ownerId: id },
    });
  }

  async create(id: string, createCompanyDto: CreateCompanyDto) {
    return this.prisma.company.create({
      data: {
        name: createCompanyDto.name,
        ownerId: id,
      },
    });
  }

  async update(updateCompanyDto: UpdateCompanyDto) {
    return this.prisma.company.update({
      where: { id: updateCompanyDto.id },
      data: updateCompanyDto,
    });
  }

  async delete(user: string, id: string) {
    return this.prisma.company.delete({
      where: { id, ownerId: user },
    });
  }

  async inviteUserToCompany(createCompanyMappingDto: CreateCompanyMappingDto) {
    const { userId, companyId } = createCompanyMappingDto;

    try {
      const existingMapping = await this.prisma.companyMapping.findUnique({
        where: {
          userId_companyId: { userId, companyId },
        },
      });

      if (existingMapping && existingMapping.status === COMPANY_STATUS.ACCEPTED) {
        throw new Error("User is already part of the company.");
      } else if (existingMapping && existingMapping.status === COMPANY_STATUS.PENDING) {
        throw new Error("User already has a pending invite to the company.");
      }

      await this.prisma.companyMapping.upsert({
        where: {
          userId_companyId: { userId, companyId },
        },
        update: {
          status: COMPANY_STATUS.PENDING,
          invitedAt: new Date().toString(),
        },
        create: {
          company: { connect: { id: companyId } },
          user: { connect: { id: userId } },
          invitedAt: new Date().toString(),
        },
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async getActiveInvitations(userId: string) {
    try {
      const data = await this.prisma.companyMapping.findMany({
        where: { userId, status: COMPANY_STATUS.PENDING },
        include: { company: true },
      });

      return data;
    } catch (error) {
      throw new Error(`Error occurred while fetching invitations: ${error}`);
    }
  }

  async changeEmploymentStatus(companyMappingId: string, status: COMPANY_STATUS) {
    try {
      const data = await this.prisma.companyMapping.update({
        where: { id: companyMappingId },
        data: { status: status, respondedAt: new Date().toString() },
      });

      return data;
    } catch (error) {
      throw new Error(`Error occurred while fetching invitations: ${error}`);
    }
  }
}
