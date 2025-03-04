import { Injectable, NotFoundException } from "@nestjs/common";
import {
  CompanyDto,
  CompanyWithEmployees,
  CreateCompanyDto,
  CreateCompanyMappingDto,
  EmployeeDto,
  UpdateCompanyDto,
} from "@reactive-resume/dto";
import { PrismaService } from "nestjs-prisma";

@Injectable()
export class CompanyService {
  constructor(private readonly prisma: PrismaService) {}

  async getCompanyByOwnerId(id: string): Promise<CompanyDto[]> {
    return this.prisma.company.findMany({
      where: { owner  Id: id },
    });
  }

  async getCompanyById(id: string): Promise<CompanyDto> {
    return this.prisma.company.findUniqueOrThrow({
      where: { id },
    });
  }

  async getById(id: string): Promise<CompanyWithEmployees> {
    const company = await this.prisma.company.findUnique({
      where: { id },
      include: {
        CompanyMapping: {
          include: {
            user: true,
            role: true,
          },
        },
      },
    });

    if (!company) {
      throw new NotFoundException(`Company with id ${id} not found`);
    }

    return {
      ...company,
      employees: company.CompanyMapping.map((mapping) => ({
        id: mapping.user.id,
        updatedAt: mapping.user.updatedAt,
        username: mapping.user.username,
        email: mapping.user.email,
        role: mapping.role ? [mapping.role.name] : null,
      })),
    };
  }

  async create(id: string, createCompanyDto: CreateCompanyDto) {
    return this.prisma.company.create({
      data: {
        name: createCompanyDto.name,
        ownerId: id,
        description: "",
        location: "",
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

  async getEmployees(companyId: string): Promise<EmployeeDto[]> {
    const mappings = await this.prisma.companyMapping.findMany({
      where: { companyId, acceptedInvitation: true },
      include: { user: true, role: true },
    });

    return mappings.map((mapping) => ({
      id: mapping.user.id,
      email: mapping.user.email,
      username: mapping.user.username,
      role: mapping.role ? [mapping.role.name] : null,
      updatedAt: mapping.user.updatedAt,
    }));
  }

  async removeUserFromCompany(companyId: string, username: string) {
    const user = await this.prisma.user.findUnique({
      where: { username: username },
    });
    if (!user) {
      throw new NotFoundException(`User with identifier ${username} not found`);
    }

    return this.prisma.companyMapping.delete({
      where: { userId_companyId: { userId: user.id, companyId } },
    });
  }

  async inviteUserToCompany(createCompanyMappingDto: CreateCompanyMappingDto) {
    try {
      await this.prisma.companyMapping.create({
        data: {
          company: { connect: { id: createCompanyMappingDto.companyId } },
          user: { connect: { id: createCompanyMappingDto.userId } },
          invitedAt: new Date(),
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
}
