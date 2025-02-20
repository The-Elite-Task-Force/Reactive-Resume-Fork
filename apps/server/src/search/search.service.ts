/*  
CREATE TABLE searchIndex (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    document TEXT,
    "userId" TEXT NOT NULL REFERENCES "User"(id) ON DELETE CASCADE,
    embedding vector(1536) NOT NULL  -- 1536 is the OpenAI embedding size, adjust as needed
);
*/

import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from "nestjs-prisma";
import OpenAI from "openai";


const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, 
});

export async function getEmbedding(text: string): Promise<number[]> {
  try {
    const response = await openai.embeddings.create({
      model: "text-embedding-ada-002",
      input: text,
    });

    if (response.data && response.data[0].embedding.length > 0) {
      return response.data[0].embedding
    } else {
      throw new Error("No embedding returned from OpenAI");
    }
  } catch (error) {
    console.error("Error getting embedding from OpenAI:", error);
    throw error;
  }
}


@Injectable()
export class SearchService {
  constructor(private readonly prisma: PrismaService) {}

  async searchUsers(searchQuery: string, k: number) {


    try {
      // Get the embedding for the search query
      const searchQueryEmbedding = await getEmbedding(searchQuery);

     
      const searchResults: { userId: string }[] = await this.prisma.$queryRaw`
        SELECT "userId"
        FROM searchIndex
        WHERE embedding <-> ${searchQueryEmbedding} < 0.5
        ORDER BY embedding <-> ${searchQueryEmbedding}
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
        console.error("Error searching users:", error);
        throw new InternalServerErrorException(error);
    }      
  }
}