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
    try {
      await this.prisma.companyMapping.create({
        data: {
          company: { connect: { id: createCompanyMappingDto.companyId } },
          user: { connect: { id: createCompanyMappingDto.userId } },
          invitedAt: new Date().toString(),
        },
      });
    } catch (error) {
      if (
        error.code === "P2002" &&
        error.meta.target.includes("userId") &&
        error.meta.target.includes("companyId")
      ) {
        throw new Error("User has already been invited to this company.");
      }
      throw error;
    }
  }

  async getActiveInvitations(userId: string) {
    try {
      const data = await this.prisma.companyMapping.findMany({
        where: { userId, status: COMPANY_STATUS.PENDING },
        include: { company: true },
      });
      if (data.length === 0) {
        throw new Error("No invitations found");
      }
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
