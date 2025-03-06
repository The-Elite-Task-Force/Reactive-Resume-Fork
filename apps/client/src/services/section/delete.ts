import type { DeleteDto, SECTION_FORMAT } from "@reactive-resume/dto";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { SECTIONS_KEY } from "@/client/constants/query-keys";
import { axios } from "@/client/libs/axios";

export const deleteSectionItem = async ({
  data,
  format,
}: {
  data: DeleteDto;
  format: SECTION_FORMAT;
}) => {
  const response = await axios.delete(`/sectionItem/${data.id}/${format}`);
  return response.data as DeleteDto;
};

export const useDeleteSectionItem = () => {
  const queryClient = useQueryClient();

  const {
    error,
    isPending: loading,
    mutateAsync: mutationFn,
  } = useMutation({
    mutationFn: deleteSectionItem,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: SECTIONS_KEY });
    },
  });

  return { deleteSectionItem: mutationFn, loading, error };
};
