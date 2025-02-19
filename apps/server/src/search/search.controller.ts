import { Controller, Get, InternalServerErrorException, Query } from "@nestjs/common";

import { SearchService } from "./search.service";

@Controller("search")
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get("users")
  async searchUsers(@Query("query") searchQuery: string, @Query("k") k: number) {
    try {
      const users = await this.searchService.searchUsers(searchQuery, k);
      return users;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
