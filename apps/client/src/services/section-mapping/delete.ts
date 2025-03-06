import type { DeleteMappingDto } from "@reactive-resume/dto";

import { axios } from "@/client/libs/axios";

export const deleteSectionMapping = async (data: DeleteMappingDto) => {
  const response = await axios.delete(`sectionItem/mappings`, { data: data });

  return response.data;
};
