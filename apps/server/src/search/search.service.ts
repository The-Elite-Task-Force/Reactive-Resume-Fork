/*  
CREATE TABLE searchIndex (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    document TEXT,
    "userId" TEXT NOT NULL REFERENCES "User"(id) ON DELETE CASCADE,
    embedding vector(1536) NOT NULL  -- 1536 is the OpenAI embedding size, adjust as needed
);
*/

import { Injectable, InternalServerErrorException } from '@nestjs/common';

import { PrismaService } from '@/prisma/prisma.service';


@Injectable()
export class SearchService {
  constructor(private readonly prisma: PrismaService) {}

  async searchUsers(searchQuery: string, k: number) {
    try {
      // Perform the search using pgvector
      const searchResults = await this.prisma.$queryRaw`
        SELECT "userId"
        FROM searchIndex
        WHERE embedding <-> ${searchQuery} < 0.5
        ORDER BY embedding <-> ${searchQuery}
        LIMIT ${k};
      `;

      // Extract user IDs from the search results
      const userIds = searchResults.map((result: { userId: string }) => result.userId);

      // Retrieve users based on the search results
      const users = await this.prisma.user.findMany({
        where: {
          id: {
            in: userIds,
          },
        },
      });

      return users;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}