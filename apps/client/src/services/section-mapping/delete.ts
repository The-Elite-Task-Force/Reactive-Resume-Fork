import type { DeleteMappingDto } from "@reactive-resume/dto";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { SECTION_MAPPING_KEY } from "@/client/constants/query-keys";
import { axios } from "@/client/libs/axios";

export const deleteSectionMapping = async (data: DeleteMappingDto) => {
  const response = await axios.delete(`sectionItem/mappings`, { data: data });

  return response.data;
};

export const useDeleteSectionMapping = (id: string) => {
  const queryClient = useQueryClient();

  const {
    error,
    isPending: loading,
    mutateAsync: mutationFn,
  } = useMutation({
    mutationFn: deleteSectionMapping,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [SECTION_MAPPING_KEY, id] });
    },
  });

  return { deleteSectionMapping: mutationFn, loading, error };
};
