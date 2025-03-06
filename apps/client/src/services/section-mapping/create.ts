import type { CreateSectionMappingDto, SectionMappingItemDto } from "@reactive-resume/dto";
import type { AxiosResponse } from "axios";

import { axios } from "@/client/libs/axios";

export const createSectionMapping = async (data: CreateSectionMappingDto) => {
  const response = await axios.post<
    SectionMappingItemDto,
    AxiosResponse<SectionMappingItemDto>,
    CreateSectionMappingDto
  >("sectionItem/mappings", data);

  return response.data;
};
