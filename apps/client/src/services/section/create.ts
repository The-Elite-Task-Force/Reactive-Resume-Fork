import type { CreateSectionItemDto, SectionItemDto } from "@reactive-resume/dto";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";

import { SECTIONS_KEY } from "@/client/constants/query-keys";
import { axios } from "@/client/libs/axios";

export const createSectionItem = async (data: CreateSectionItemDto) => {
  const response = await axios.post<
    SectionItemDto,
    AxiosResponse<SectionItemDto>,
    CreateSectionItemDto
  >("/sectionItem", data);
  return response.data;
};

export const useCreateSectionItem = () => {
  const queryClient = useQueryClient();

  const {
    error,
    isPending: loading,
    mutateAsync: mutationFn,
  } = useMutation({
    mutationFn: createSectionItem,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: SECTIONS_KEY });
    },
  });

  return { createSectionItem: mutationFn, loading, error };
};
