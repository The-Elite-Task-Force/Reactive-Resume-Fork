import { DeleteDto, SECTION_FORMAT } from "@reactive-resume/dto";

import { axios } from "@/client/libs/axios";

export const deleteSectionItem = async (data: DeleteDto, format: SECTION_FORMAT) => {
  const response = await axios.delete(`/sectionItem/${data.id}/${format}`);
  return response.data as DeleteDto;
};
