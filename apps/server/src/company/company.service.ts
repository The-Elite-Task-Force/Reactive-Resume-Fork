import { Injectable, NotFoundException } from "@nestjs/common";
import {
  CompanyDto,
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
      where: { ownerId: id },
    });
  }

  async getCompanyById(id: string): Promise<CompanyDto> {
    return this.prisma.company.findUniqueOrThrow({
      where: { id },
    });
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
      where: { companyId, status: "ACCEPTED" },
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
    if (createCompanyMappingDto.userId) {
      try {
        await this.prisma.companyMapping.create({
          data: {
            company: { connect: { id: createCompanyMappingDto.companyId } },
            user: { connect: { id: createCompanyMappingDto.userId } },
            invitedAt: new Date().toISOString(),
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
    } else if (createCompanyMappingDto.username) {
      const user = await this.prisma.user.findUnique({
        where: { username: createCompanyMappingDto.username },
      });
      if (!user) {
        throw new NotFoundException(
          `User with identifier ${createCompanyMappingDto.username} not found`,
        );
      }
      try {
        await this.prisma.companyMapping.create({
          data: {
            company: { connect: { id: createCompanyMappingDto.companyId } },
            user: { connect: { id: user.id } },
            invitedAt: new Date().toISOString(),
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
    } else {
      throw new Error("No user identifier provided");
    }
  }
}
