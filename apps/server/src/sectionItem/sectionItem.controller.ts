import {
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  Logger,
  Param,
  Patch,
  Post,
  UseGuards,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { User as UserEntity } from "@prisma/client";
import { CreateSectionItemDto, UpdateSectionItemDto } from "@reactive-resume/dto";
import { sectionSchemaWithData } from "@reactive-resume/schema";
import zodToJsonSchema from "zod-to-json-schema";

import { TwoFactorGuard } from "../auth/guards/two-factor.guard";
import { User } from "../user/decorators/user.decorator";
import { SectionItemService } from "./sectionItem.service";

@ApiTags("SectionItem")
@Controller("sectionItem")
export class SectionItemController {
  constructor(private readonly sectionItemService: SectionItemService) {}

  @Get("schema")
  getSchema() {
    return zodToJsonSchema(sectionSchemaWithData);
  }

  @Get()
  @UseGuards(TwoFactorGuard)
  findAll(@User() user: UserEntity) {
    return this.sectionItemService.findAll(user.id);
  }

  @Post()
  @UseGuards(TwoFactorGuard)
  async create(@User() user: UserEntity, @Body() createSectionDto: CreateSectionItemDto) {
    try {
      return await this.sectionItemService.createSectionItem(user.id, createSectionDto);
    } catch (error) {
      Logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }

  @Get("/hello")
  hello() {
    return "Hello World!";
  }

  @Patch(":id")
  @UseGuards(TwoFactorGuard)
  async update(
    @User() user: UserEntity,
    @Param("id") id: string,
    @Body() updateSectionDto: UpdateSectionItemDto,
  ) {
    try {
      return await this.sectionItemService.updateSectionItem(user.id, id, updateSectionDto);
    } catch (error) {
      Logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }

  @Delete(":id")
  @UseGuards(TwoFactorGuard)
  async delete(@User() user: UserEntity, @Param("id") id: string) {
    try {
      return await this.sectionItemService.deleteSectionItem(id);
    } catch (error) {
      Logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }

  @Delete("work/:id")
  @UseGuards(TwoFactorGuard)
  async deleteWorkItem(@User() user: UserEntity, @Param("id") id: string) {
    try {
      return await this.sectionItemService.deleteWorkItem(id);
    } catch (error) {
      Logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }

  @Delete("award/:id")
  @UseGuards(TwoFactorGuard)
  async deleteAwardItem(@User() user: UserEntity, @Param("id") id: string) {
    try {
      return await this.sectionItemService.deleteAwardItem(id);
    } catch (error) {
      Logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }

  @Delete("skill/:id")
  @UseGuards(TwoFactorGuard)
  async deleteSkillItem(@User() user: UserEntity, @Param("id") id: string) {
    try {
      return await this.sectionItemService.deleteSkillItem(id);
    } catch (error) {
      Logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }

  @Delete("project/:id")
  @UseGuards(TwoFactorGuard)
  async deleteProjectItem(@User() user: UserEntity, @Param("id") id: string) {
    try {
      return await this.sectionItemService.deleteProjectItem(id);
    } catch (error) {
      Logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }

  @Delete("education/:id")
  @UseGuards(TwoFactorGuard)
  async deleteEducationItem(@User() user: UserEntity, @Param("id") id: string) {
    try {
      return await this.sectionItemService.deleteEducationItem(id);
    } catch (error) {
      Logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }

  @Delete("interest/:id")
  @UseGuards(TwoFactorGuard)
  async deleteInterestItem(@User() user: UserEntity, @Param("id") id: string) {
    try {
      return await this.sectionItemService.deleteInterestItem(id);
    } catch (error) {
      Logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }

  @Delete("language/:id")
  @UseGuards(TwoFactorGuard)
  async deleteLanguageItem(@User() user: UserEntity, @Param("id") id: string) {
    try {
      return await this.sectionItemService.deleteLanguageItem(id);
    } catch (error) {
      Logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }

  @Delete("volunteer/:id")
  @UseGuards(TwoFactorGuard)
  async deleteVolunteerItem(@User() user: UserEntity, @Param("id") id: string) {
    try {
      return await this.sectionItemService.deleteVolunteerItem(id);
    } catch (error) {
      Logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }

  @Delete("reference/:id")
  @UseGuards(TwoFactorGuard)
  async deleteReferenceItem(@User() user: UserEntity, @Param("id") id: string) {
    try {
      return await this.sectionItemService.deleteReferenceItem(id);
    } catch (error) {
      Logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }

  @Delete("publication/:id")
  @UseGuards(TwoFactorGuard)
  async deletePublicationItem(@User() user: UserEntity, @Param("id") id: string) {
    try {
      return await this.sectionItemService.deletePublicationItem(id);
    } catch (error) {
      Logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }

  @Delete("certification/:id")
  @UseGuards(TwoFactorGuard)
  async deleteCertificationItem(@User() user: UserEntity, @Param("id") id: string) {
    try {
      return await this.sectionItemService.deleteCertificationItem(id);
    } catch (error) {
      Logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }

  @Delete("profile:id")
  @UseGuards(TwoFactorGuard)
  async deleteProfileItem(@User() user: UserEntity, @Param("id") id: string) {
    try {
      return await this.sectionItemService.deleteProfileItem(id);
    } catch (error) {
      Logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }

  @Delete("basics:id")
  @UseGuards(TwoFactorGuard)
  async deleteBasicsItem(@User() user: UserEntity, @Param("id") id: string) {
    try {
      return await this.sectionItemService.deleteBasicsItem(id);
    } catch (error) {
      Logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }
}
