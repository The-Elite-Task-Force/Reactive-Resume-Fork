import type { CreateSectionMappingDto, SectionMappingItemDto } from "@reactive-resume/dto";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";

import { SECTION_MAPPING_KEY } from "@/client/constants/query-keys";
import { axios } from "@/client/libs/axios";

export const createSectionMapping = async (data: CreateSectionMappingDto) => {
  const response = await axios.post<
    SectionMappingItemDto,
    AxiosResponse<SectionMappingItemDto>,
    CreateSectionMappingDto
  >("sectionItem/mappings", data);

  return response.data;
};

export const useCreateSectionMapping = () => {
  const queryClient = useQueryClient();

  const {
    error,
    isPending: loading,
    mutateAsync: mutationFn,
  } = useMutation({
    mutationFn: createSectionMapping,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: SECTION_MAPPING_KEY });
    },
  });

  return { createSectionMapping: mutationFn, loading, error };
};
