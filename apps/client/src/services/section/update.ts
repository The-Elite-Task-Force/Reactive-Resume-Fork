import type { SectionItemDto, UpdateSectionItemDto } from "@reactive-resume/dto";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";

import { SECTIONS_KEY } from "@/client/constants/query-keys";
import { axios } from "@/client/libs/axios";

export const updateSectionItem = async (data: UpdateSectionItemDto) => {
  const response = await axios.patch<
    SectionItemDto,
    AxiosResponse<SectionItemDto>,
    UpdateSectionItemDto
  >(`/sectionItem/${data.id}`, data);
  return response.data;
};

export const useUpdateSectionItem = () => {
  const queryClient = useQueryClient();

  const {
    error,
    isPending: loading,
    mutateAsync: mutationFn,
  } = useMutation({
    mutationFn: updateSectionItem,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: SECTIONS_KEY });
    },
  });

  return { updateSectionItem: mutationFn, loading, error };
};
